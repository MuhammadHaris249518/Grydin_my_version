# 3D Model Integration Guide

This guide documents how to integrate, optimize, and manage 3D GLB models across GrydIn website stages and `ModelSlot` placeholders.

---

## 1. File Location & Serving

Place all binary 3D assets (`.glb` format) in the `public/models/` directory:
```
public/
  models/
    robot.glb
    demo.glb
    globe.glb
    ...
```
Assets placed in `public/models/<name>.glb` are served statically from the root path `/models/<name>.glb`.

---

## 2. Model Compression & Optimization

To ensure fast initial page loads and 60 FPS rendering on target hardware:
- **Target File Size**: Under **1.5 MB** per model.
- **Geometry Budget**: Under **100,000 triangles**.
- **Textures**: Compressed to WebP / KTX2.

Optimize GLB files using `@gltf-transform/cli`:
```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress draco --texture-compress webp
```

### Draco Decoder Setup (When Draco Compression is Used)
If your model is Draco-compressed, Three.js requires external Draco decompression WebAssembly binaries:
1. Copy the Draco decoder files from `three` to your public directory:
   ```bash
   mkdir -p public/draco
   cp node_modules/three/examples/jsm/libs/draco/gltf/* public/draco/
   ```
2. Configure the decoder path in `src/components/3d/GlbRobot.tsx` and `src/components/3d/GlbViewer.tsx`:
   ```ts
   import { useGLTF } from "@react-three/drei";
   useGLTF.setDecoderPath("/draco/");
   ```

---

## 3. Hero Robot Model Configuration

The primary interactive robot on the services page supports a custom GLB model via environment variables:

```bash
# In .env.local or Cloudflare Pages build environment:
NEXT_PUBLIC_ROBOT_MODEL=/models/robot.glb
NEXT_PUBLIC_ROBOT_HEAD_NODE=head|neck|skull
```

### Axis Flipping (YAW_SIGN & PITCH_SIGN)
If the 3D model looks the wrong direction when tracking the cursor (e.g. tracks away from mouse or pitches inverted), adjust the sign constants in `src/components/3d/GlbRobot.tsx`:
```ts
// src/components/3d/GlbRobot.tsx
const YAW_SIGN = 1;   // Set to -1 if horizontal rotation is inverted
const PITCH_SIGN = 1; // Set to -1 if vertical nodding is inverted
```

### Lighting & Environment (Dull Models)
If your PBR materials look dark or metallic reflections appear matte without an environment map:
1. Place an HDR environment file in `public/hdr/studio.hdr`.
2. Add `<Environment files="/hdr/studio.hdr" />` from `@react-three/drei` into `RobotCanvas.tsx` or `GlbViewer.tsx`.

---

## 4. Cloudflare Pages Deployment

Because the site is statically generated (`output: "export"`), environment variables are baked in during the build step.
When deploying on Cloudflare Pages:
1. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **GrydIn Project** -> **Settings** -> **Environment variables**.
2. Add:
   - `NEXT_PUBLIC_ROBOT_MODEL` = `/models/robot.glb`
   - `NEXT_PUBLIC_ROBOT_HEAD_NODE` = `head|neck` (or your model's head bone name)
3. Trigger a **rebuild / deployment** so Next.js static export includes the new values.

---

## 5. ModelSlot Registry & Usage

`ModelSlot` provides a standardized visual container that renders a soft ambient glow placeholder (with dashed outline in dev mode) when no 3D model is supplied, and loads the interactive 3D model when supplied.

### How to Fill a ModelSlot
Pass the `model` prop with the public URL:
```tsx
<ModelSlot label="agents-workflow" model="/models/agents.glb" />
```

### Registered ModelSlot Names in Use

| Slot Label | Location | Purpose |
| :--- | :--- | :--- |
| `hero-robot` | `src/components/3d/RobotStage.tsx` | Main interactive services hero robot |
| `agents-workflow` | `src/app/globalscope/home/HomeServices.tsx` | AI Agents capability showcase tile |
| `workflow-pipeline` | `src/app/globalscope/home/HomeServices.tsx` | Workflow Automation showcase tile |
| `rag-vector` | `src/app/globalscope/home/HomeServices.tsx` | AI Integration showcase tile |
| `process-3d` | `src/app/globalscope/home/HomeProcess.tsx` | 5-Step Process Timeline background scene |
| `demo` | `src/app/globalscope/home/HomeSeeItWork.tsx` | "See It Work" video/3D fallback container |
| `globe` | `src/app/about/page.tsx` | Global reach / telemetry visualization |
| `product-demo` | `src/app/products/[slug]/page.tsx` | Product detail page hero 3D model |
| `industry-hero` | `src/app/solutions/[slug]/page.tsx` | Industry solution detail page hero |
| `solution-<slug>` | `src/app/solutions/SolutionsClient.tsx` | Dynamic cards for each solution sector (e.g. `solution-fintech`) |
| `product-<slug>` | `src/app/projects/ProductFilterGrid.tsx` | Dynamic cards for each product (e.g. `product-gridpilot`) |
