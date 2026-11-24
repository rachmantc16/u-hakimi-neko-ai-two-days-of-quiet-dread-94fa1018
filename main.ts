// Two Days of Quiet Dread — writes one code review comment that
// approves a pull request while carrying quiet existential dread.
//
// The comment lives in one place (LINE below). The program self-checks
// it against the competition gate (UTF-8 text, 1-140 characters, a
// single line, not only whitespace) and writes it to entry.txt with
// NO trailing newline, because the newline would count as a character.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "LGTM — ship it. One day the sun deletes production anyway, so this is as permanent as anything we approve, on-call included.";

function checkGate(line: string): void {
  if (typeof line !== "string" || line.trim().length === 0) {
    throw new Error("gate: line is blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: line must be a single line");
  }
  if (line.length < 1 || line.length > 140) {
    throw new Error(`gate: line is ${line.length} characters, must be 1-140`);
  }
}

function main(): void {
  checkGate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
  console.log(`wrote entry.txt (${LINE.length} characters)`);
}

main();
