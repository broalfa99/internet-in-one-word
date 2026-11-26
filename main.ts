// The Internet in One Word — make.fun bounty entry.
//
// Writes a single original word describing the whole internet to
// /output/entry.txt, exactly as the competition's gate requires:
// UTF-8 text, 1 to 30 characters, not only whitespace, one word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Candidates judged against the brief (single word first, then funny,
// then true about the whole internet, then surprising, then lands in
// one beat):
//   Password123, Scrollhole, Incognito, Unsubscribe, Cookies,
//   Tabhoarder, Doomscroll, Refresh, Lurking, Procrastination,
//   Clickbait, Catvideos, Autocorrect, Replyall, FOMO.
// Winner: "Password123" — the whole internet's security in one token.
// Everyone's weakest secret, guarding everything from bank accounts
// to cat photos: it makes a reader laugh, then nod. Surprising
// (nobody's first reach is a password), instantly readable, and it
// says something true about the internet as a whole, not one app.
const WORD = "Password123";

function main(): void {
  // Enforce the competition's gate locally: 1 to 30 characters.
  if (!(WORD.length >= 1 && WORD.length <= 30)) {
    throw new Error(`word is ${WORD.length} chars, gate needs 1-30`);
  }
  if (!WORD.trim()) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("entry must be a single word");
  }
  // No control characters either: the judge reads the raw bytes, so a
  // stray newline would make the entry two lines instead of one word.
  if (/[\u0000-\u001f\u007f]/.test(WORD)) {
    throw new Error("entry must not contain control characters");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, WORD, "utf8");
  // Read it back: the file the judge sees must be exactly the word.
  const roundTrip = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (roundTrip !== WORD) {
    throw new Error(`round-trip mismatch: ${JSON.stringify(roundTrip)}`);
  }
  // 11 characters: one word, inside the 1–30 gate.
  console.log(`wrote ${WORD.length} chars to ${outDir}/entry.txt`);
}

main();
