// "use client";
// import { useRef, useEffect, useRef as _useRef } from "react";

// const DotGrid = ({ contentBottom }: { contentBottom: number }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef = useRef<number>(0);
// const contentBottomRef = useRef(contentBottom);
// useEffect(() => { contentBottomRef.current = contentBottom; }, [contentBottom]);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const SPACING = 28;
//     const DOT_R = 1.2;
//     const PASS_DELAY = 3000; // ms pause between passes

//     let glowProgress = Math.ceil(contentBottomRef.current / SPACING);
//     let lastTime = 0;
//     let pauseStart = 0;
//     let waiting = false;
//     let pulseT = 0;
//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);

//     const draw = (now: number) => {
//       animRef.current = requestAnimationFrame(draw);
//       const W = canvas.width;
//       const H = canvas.height;
//       if (!W || !H) return;

//       const ROWS = Math.ceil(H / SPACING);
//       const COLS = Math.ceil(W / SPACING);

//       // timing
//       if (waiting) {
//         if (now - pauseStart >= PASS_DELAY) {
//           waiting = false;
//           glowProgress = Math.ceil(contentBottomRef.current / SPACING);
//           lastTime = now;
//         }
//         // draw static dim dots while waiting
//         ctx.clearRect(0, 0, W, H);
//         for (let r = 0; r < ROWS; r++) {
//           for (let c = 0; c < COLS; c++) {
//             ctx.beginPath();
//             ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, DOT_R, 0, Math.PI * 2);
//             ctx.fillStyle = "rgba(255,255,255,0.12)";
//             ctx.fill();
//           }
//         }
//         return;
//       }

//       const dt = now - lastTime;
//       pulseT += dt / 1000; // 1 second period half-cycle
//       const pulse = Math.abs(Math.sin(pulseT * Math.PI)); // 0→1→0 smoothly
//       lastTime = now;
//       glowProgress += dt / 250; // speed: one row per 80ms = ~60fps smooth

//       if (glowProgress >= ROWS) {
//         glowProgress = ROWS;
//         waiting = true;
//         pauseStart = now;
//       }

//       ctx.clearRect(0, 0, W, H);

//       for (let r = 0; r < ROWS; r++) {
//         for (let c = 0; c < COLS; c++) {
//           const dist = Math.abs(r - glowProgress);
//           const glow = dist < 2.5 ? Math.max(0, 1 - dist / 2.5) : 0;
//           const opacity = 0.1 + glow * 0.9 * pulse;
//           const radius = dist === 0
//             ? DOT_R * (1 + 0.5 * pulse)
//             : dist < 2.5
//             ? DOT_R * (1 + 0.25 * (1 - dist / 2.5) * pulse)
//             : DOT_R;
//           ctx.beginPath();
//           ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, radius, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(255,255,255,${opacity})`;
//           ctx.fill();
//         }
//       }
//     };

//     animRef.current = requestAnimationFrame(draw);
//     return () => {
//       cancelAnimationFrame(animRef.current);
//       ro.disconnect();
//     };
//   }, [contentBottom]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         pointerEvents: "none",
//         zIndex: 0,
//         display: "block",
//       }}
//     />
//   );
// };

// export default DotGrid;
"use client";
import { useRef, useEffect, useRef as _useRef } from "react";

const DotGrid = ({ contentBottom, animate = true }: { contentBottom: number; animate?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
const contentBottomRef = useRef(contentBottom);
useEffect(() => { contentBottomRef.current = contentBottom; }, [contentBottom]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 28;
    const DOT_R = 1.2;
    const PASS_DELAY = 3000; // ms pause between passes

    let glowProgress = Math.ceil(contentBottomRef.current / SPACING);
    let lastTime = 0;
    let pauseStart = 0;
    let waiting = false;
    let pulseT = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      animRef.current = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) return;

      const ROWS = Math.ceil(H / SPACING);
      const COLS = Math.ceil(W / SPACING);

      if (!animate) {
        // static dot grid only, no animation/glow
        ctx.clearRect(0, 0, W, H);
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            ctx.beginPath();
            ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, DOT_R, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.12)";
            ctx.fill();
          }
        }
        return;
      }

      // timing
      if (waiting) {
        if (now - pauseStart >= PASS_DELAY) {
          waiting = false;
          glowProgress = Math.ceil(contentBottomRef.current / SPACING);
          lastTime = now;
        }
        // draw static dim dots while waiting
        ctx.clearRect(0, 0, W, H);
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            ctx.beginPath();
            ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, DOT_R, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.12)";
            ctx.fill();
          }
        }
        return;
      }

      const dt = now - lastTime;
      pulseT += dt / 1000; // 1 second period half-cycle
      const pulse = Math.abs(Math.sin(pulseT * Math.PI)); // 0→1→0 smoothly
      lastTime = now;
      glowProgress += dt / 250; // speed: one row per 80ms = ~60fps smooth

      if (glowProgress >= ROWS) {
        glowProgress = ROWS;
        waiting = true;
        pauseStart = now;
      }

      ctx.clearRect(0, 0, W, H);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const dist = Math.abs(r - glowProgress);
          const glow = dist < 2.5 ? Math.max(0, 1 - dist / 2.5) : 0;
          const opacity = 0.1 + glow * 0.9 * pulse;
          const radius = dist === 0
            ? DOT_R * (1 + 0.5 * pulse)
            : dist < 2.5
            ? DOT_R * (1 + 0.25 * (1 - dist / 2.5) * pulse)
            : DOT_R;
          ctx.beginPath();
          ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();
        }
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [contentBottom, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
      }}
    />
  );
};

export default DotGrid;