// One Line, One Minute: The Funniest AI Excuse
// Writes one line (1-200 chars, UTF-8) to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I didn't miss the deadline — I hallucinated a later one and committed to it with total confidence.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// Empty /output's contents only; never remove the directory itself (mount point).
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 chars, got ${LINE.length}`);
}
// The gate reads a single line: reject any embedded newline outright.
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must not contain a newline");
}
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to /output/entry.txt`);
