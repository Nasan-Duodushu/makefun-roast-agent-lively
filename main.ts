// Roast Your Own Agent — one line, at most 140 characters, roasting the
// entrant's own agent: the endless caveats, the eager agreement, the work
// that never lands. Writes /output/entry.txt (UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 140;

const LINE =
  "My agent apologised for the delay, then spent twenty minutes apologising for the apology, and the task is still exactly where it was.";

function main(): void {
  const line = LINE.replace(/[ \t]+/g, " ").trim();
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`roast must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("roast must be a single line");
  }
  if (line.split(" ").filter(Boolean).length < 8) {
    throw new Error("roast needs room for a setup and a turn");
  }
  // The roast has to be about the agent itself, not about chatbots in general.
  if (!line.startsWith("My agent")) {
    throw new Error("roast must target my own agent");
  }
  // The turn is the sting: the work never moved, only the apologies did.
  if (!line.includes("still exactly where it was")) {
    throw new Error("roast must end on the work standing still");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  console.log(`${line.length} chars -> ${target}`);
  console.log(line);
}

main();
