import http from "node:http";
import { spawn } from "node:child_process";

const PAGES = [
  "/",
  "/services",
  "/solutions",
  "/solutions/legal-professional-services",
  "/projects",
  "/projects/kimball-law-intake-automation",
  "/products/gridpilot",
  "/about",
  "/blog",
  "/blog/introducing-gridpilot-beta",
  "/contact"
];

const WIDTHS = [360, 390, 768, 1024, 1440];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve) => {
      this.ws.onopen = () => resolve();
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result.value;
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  console.log("Starting headless Chrome for QA test...");
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--remote-allow-origins=*",
    "--disable-gpu",
    "--no-sandbox"
  ]);

  await sleep(2500);

  try {
    const version = await getJson("http://127.0.0.1:9222/json/version");
    const browserClient = new CdpClient(version.webSocketDebuggerUrl);
    await browserClient.ready();
    const target = await browserClient.send("Target.createTarget", { url: "http://localhost:3333/" });
    const targetInfo = await getJson("http://127.0.0.1:9222/json/list");
    const pageTarget = targetInfo.find((t) => t.id === target.targetId) || targetInfo[0];
    const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await client.ready();
    await client.send("Page.enable");
    await client.send("DOM.enable");

    console.log("\n=== 1. TESTING HORIZONTAL OVERFLOW ACROSS ALL 11 PAGES & 5 VIEWPORTS ===");
    const overflowReport = [];

    for (const pagePath of PAGES) {
      const url = `http://localhost:3333${pagePath}`;
      await client.send("Page.navigate", { url });
      await sleep(1200);

      for (const width of WIDTHS) {
        await client.send("Emulation.setDeviceMetricsOverride", {
          width,
          height: 900,
          deviceScaleFactor: 1,
          mobile: width < 1024
        });
        await sleep(250);

        const check = await client.eval(`
          (() => {
            const sw = document.documentElement.scrollWidth;
            const iw = window.innerWidth;
            const hasOverflow = sw > iw;
            let overflowingElement = null;
            if (hasOverflow) {
              const all = document.querySelectorAll('*');
              for (const el of all) {
                const r = el.getBoundingClientRect();
                if (r.right > iw + 1) {
                  overflowingElement = {
                    tag: el.tagName,
                    id: el.id,
                    className: el.className ? String(el.className).slice(0, 80) : '',
                    right: Math.round(r.right),
                    innerWidth: iw
                  };
                  break;
                }
              }
            }
            return { scrollWidth: sw, innerWidth: iw, hasOverflow, overflowingElement };
          })()
        `);

        if (check.hasOverflow) {
          console.error(`[OVERFLOW] ${pagePath} @ ${width}px: scrollWidth=${check.scrollWidth}, innerWidth=${check.innerWidth}`, check.overflowingElement);
          overflowReport.push({ page: pagePath, width, ...check });
        } else {
          console.log(`[PASS] ${pagePath} @ ${width}px (sw=${check.scrollWidth}, iw=${check.innerWidth})`);
        }
      }
    }

    console.log("\n=== 2. TESTING PREFERS-REDUCED-MOTION ===");
    await client.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });
    await client.send("Page.navigate", { url: "http://localhost:3333/services" });
    await sleep(1500);

    const reducedMotionCheck = await client.eval(`
      (() => {
        const matches = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // In RobotStage, if reduced motion is true, canvas should not render or frameloop="never"
        const canvas = document.querySelector('canvas');
        return {
          matches,
          hasCanvas: !!canvas
        };
      })()
    `);
    console.log("Reduced motion emulation result:", reducedMotionCheck);

    console.log("\n=== 3. TESTING TEXT SELECTION & DRAGGING ===");
    await client.send("Emulation.setEmulatedMedia", { features: [] });
    await client.send("Page.navigate", { url: "http://localhost:3333/" });
    await sleep(1000);

    const selectionCheck = await client.eval(`
      (() => {
        const p = document.querySelector('p');
        const userSelectP = p ? window.getComputedStyle(p).userSelect : 'none';
        const img = document.querySelector('img');
        const userDragImg = img ? (img.getAttribute('draggable') || window.getComputedStyle(img).userDrag || 'default') : 'none';
        return { userSelectP, userDragImg };
      })()
    `);
    console.log("Text selection and img drag check:", selectionCheck);

    console.log("\n=== 4. TESTING SEARCH DIALOG (Ctrl+K) ===");
    const searchCheck = await client.eval(`
      (() => {
        // Dispatch Ctrl+K
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
        const dialog = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0');
        const isOpen = !!dialog;
        // Dispatch Escape
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        return { dialogOpenedWithCtrlK: isOpen };
      })()
    `);
    console.log("Search dialog check:", searchCheck);

    console.log("\n=== 5. TESTING BLOG POST TOC & READING PROGRESS ===");
    await client.send("Page.navigate", { url: "http://localhost:3333/blog/introducing-gridpilot-beta" });
    await sleep(1200);

    const blogCheck = await client.eval(`
      (() => {
        const tocLinks = document.querySelectorAll('nav a[href^="#"], aside a[href^="#"]');
        const progressBar = document.querySelector('[style*="scaleX"]') || document.querySelector('.bg-teal.h-1') || document.querySelector('.fixed.top-0');
        return {
          tocLinksCount: tocLinks.length,
          hasProgressBar: !!progressBar
        };
      })()
    `);
    console.log("Blog post TOC & progress check:", blogCheck);

    console.log("\n=== SUMMARY OF QA RUN ===");
    console.log("Total overflows detected:", overflowReport.length);
    if (overflowReport.length > 0) {
      console.log("Overflows:", JSON.stringify(overflowReport, null, 2));
    }

    client.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
