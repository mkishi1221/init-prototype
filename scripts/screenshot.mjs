import { createServer } from "vite";
import { chromium } from "playwright";

const mobile = process.argv.includes("--mobile");
const pageName = process.argv.find((a) => !a.startsWith("-") && a !== process.argv[0] && a !== process.argv[1]) || "";
const viewport = mobile
  ? { width: 390, height: 844 }
  : { width: 1280, height: 900 };
const outPath = "/tmp/prototype-screenshot.png";

const server = await createServer({
  server: { port: 4002, strictPort: false },
  logLevel: "silent",
});
await server.listen();

const url = pageName ? `http://localhost:4002/${pageName}` : "http://localhost:4002";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
await page.goto(url);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: outPath, fullPage: true });

await browser.close();
await server.close();

console.log(outPath);
