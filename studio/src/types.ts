// Reel 1本のレンダリングデータ（Remotion の props として渡る形）。
// generate.mjs が videoSrc / audioSrc を埋める。字幕タイミングは手書き or Whisper で生成。

export type SubtitleCue = {
  /** 表示開始フレーム（fps 基準） */
  from: number;
  /** 表示終了フレーム */
  to: number;
  /** 字幕テキスト（短く・余白を残す） */
  text: string;
};

export type ReelData = {
  id: string;
  /** コンテンツ柱 A:法則 B:物語 C:古今 D:余白 E:裏側 */
  series: "A" | "B" | "C" | "D" | "E";
  title: string;
  fps: number;
  durationInFrames: number;

  /** public/ からの相対パス。空なら絵画調グラデの背景にフォールバック */
  videoSrc: string;
  /** public/ からの相対パス。空なら無音 */
  audioSrc: string;
  /** BGM（任意・小音量で重ねる） */
  bgmSrc?: string;

  subtitles: SubtitleCue[];

  /** エンドカード：語りの締め（例「手放した瞬間に、来る。」） */
  endLine: string;
  endLineFrom: number;
  /** エンドカード：静かなCTA（例「つづきは、—」）ブルー→パープルのグラデ文字 */
  endCta: string;
  endCtaFrom: number;
};
