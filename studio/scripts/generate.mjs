// 生成レイヤー：spec を読んで ①キーフレーム(画像) ②img2video ③ナレーション音声 を作り、
// レンダリング用 data(ep-XX.json) の videoSrc/audioSrc を埋める。
//
// 使い方:  node scripts/generate.mjs ep-s01
// 必要env:  FAL_KEY / ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID  (.env)
//
// 注意: fal のモデルIDは変動するので、spec.models を fal.ai/models の最新で確認すること。
//       interactive に探すなら fal MCP の search を使うのが速い（README参照）。

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fal } from "@fal-ai/client";

const id = process.argv[2] ?? "ep-s01";
const specPath = `data/${id}.spec.json`;
const renderPath = `data/${id}.json`;

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const render = JSON.parse(fs.readFileSync(renderPath, "utf8"));

const outDir = path.join("public", "assets", id);
fs.mkdirSync(outDir, { recursive: true });

requireEnv("FAL_KEY");
fal.config({ credentials: process.env.FAL_KEY });

// ① キーフレーム（Nano Banana 2 = キャラ一貫性）
console.log(`[1/3] image: ${spec.models.image}`);
const imageInput = {
  prompt: spec.image.prompt,
  image_size: spec.image.imageSize ?? "portrait_16_9",
};
if (spec.image.referenceImageUrls?.length) {
  // 同一キャラを保つための参照画像（モデルごとにキー名が違う場合あり。要確認）
  imageInput.reference_image_urls = spec.image.referenceImageUrls;
}
const imageRes = await fal.subscribe(spec.models.image, {
  input: imageInput,
  logs: true,
});
const imageUrl =
  imageRes.data?.images?.[0]?.url ?? imageRes.data?.image?.url;
if (!imageUrl) {
  throw new Error("画像URLが取得できませんでした: " + JSON.stringify(imageRes.data));
}
await download(imageUrl, path.join(outDir, "keyframe.png"));

// ② 一枚絵を動かす（img2video）
console.log(`[2/3] image->video: ${spec.models.video}`);
const videoRes = await fal.subscribe(spec.models.video, {
  input: {
    prompt: spec.motion.prompt,
    image_url: imageUrl,
    duration: spec.motion.durationSec ?? 5,
    aspect_ratio: spec.motion.aspectRatio ?? "9:16",
  },
  logs: true,
});
const videoUrl = videoRes.data?.video?.url ?? videoRes.data?.videos?.[0]?.url;
if (!videoUrl) {
  throw new Error("動画URLが取得できませんでした: " + JSON.stringify(videoRes.data));
}
await download(videoUrl, path.join(outDir, "clip.mp4"));

// ③ ナレーション（ElevenLabs REST。葵は喋らない＝ナレーター固定）
console.log("[3/3] narration: ElevenLabs");
requireEnv("ELEVENLABS_API_KEY");
const voiceId = process.env[spec.voice.voiceIdEnv ?? "ELEVENLABS_VOICE_ID"];
requireEnv(spec.voice.voiceIdEnv ?? "ELEVENLABS_VOICE_ID");
const ttsRes = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: spec.voice.text,
      model_id: spec.voice.modelId ?? "eleven_v3",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  }
);
if (!ttsRes.ok) {
  throw new Error(`ElevenLabs ${ttsRes.status}: ${await ttsRes.text()}`);
}
fs.writeFileSync(
  path.join(outDir, "narration.mp3"),
  Buffer.from(await ttsRes.arrayBuffer())
);

// レンダリングデータに反映
render.videoSrc = `assets/${id}/clip.mp4`;
render.audioSrc = `assets/${id}/narration.mp3`;
fs.writeFileSync(renderPath, JSON.stringify(render, null, 2) + "\n");

console.log(`\n✅ 生成完了 → ${outDir}`);
console.log(`   次は:  node scripts/build-reel.mjs ${id}`);
console.log(
  "   ※字幕タイミングは data/" +
    id +
    ".json を耳で微調整（or Whisperで自動化）。"
);

// --- helpers ---
async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}: ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("   saved " + dest);
}

function requireEnv(name) {
  if (!process.env[name]) {
    console.error(`環境変数 ${name} が未設定です。studio/.env を確認してください。`);
    process.exit(1);
  }
}
