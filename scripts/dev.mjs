import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(dirname(fileURLToPath(import.meta.url))), "public");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

http
  .createServer((req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    const rawPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const safePath = normalize(rawPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(root, safePath);

    if (!existsSync(filePath)) {
      filePath = join(root, "index.html");
    }

    res.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");
    createReadStream(filePath).pipe(res);
  })
  .listen(port, () => {
    console.log(`Local preview: http://localhost:${port}`);
  });
