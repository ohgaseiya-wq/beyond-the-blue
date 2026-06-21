import { Config } from "@remotion/cli/config";

// 9:16 縦型 Reels。画質と書き出しの既定設定。
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // CPU数から自動

// H.264 で IG/TikTok 互換の MP4 を書き出す
Config.setCodec("h264");
