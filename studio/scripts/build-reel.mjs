// 組み立てレイヤー：Remotion で最終MP4を書き出すラッパー。
// 使い方:  node scripts/build-reel.mjs ep-s01

import { execSync } from "node:child_process";

const id = process.argv[2] ?? "ep-s01";
const out = `out/${id}.mp4`;
const props = `./data/${id}.json`;

console.log(`rendering ${id} -> ${out}`);
execSync(
  `npx remotion render src/index.ts AoiReel ${out} --props=${props}`,
  { stdio: "inherit" }
);
console.log(`\n✅ 完成: ${out}`);
