// Beyond the Blue ブランド定数。色・余白・尺をコードで固定し、毎回ブレないようにする。
// （純粋な定数のみ。Node スクリプトからも import できるよう、ここでフォント読込はしない）

export const BRAND = {
  colors: {
    blueLight: "#6BB8E0", // 葵の目、キーカラー
    blueMid: "#7B8EC8", // グラデーション中間
    purple: "#9B7BB8", // Epiphany、転換点
    deepNavy: "#0A0E1A", // 背景
    accentWarm: "#C8A87B", // 師、温かみ
    text: "#EAF2F8", // 字幕の白（やや青み）
  },
  layout: {
    fps: 30,
    width: 1080,
    height: 1920, // 9:16
    safeBottom: 360, // 字幕の下の余白（UIに隠れない高さ）
    subtitleMaxWidth: 860,
  },
} as const;
