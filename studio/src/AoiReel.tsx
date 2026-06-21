import { AbsoluteFill, Audio, staticFile } from "remotion";
import { BRAND } from "./brand";
import type { ReelData } from "./types";
import { Background } from "./components/Background";
import { Vignette } from "./components/Vignette";
import { Subtitles } from "./components/Subtitles";
import { EndCard } from "./components/EndCard";

// 「同じ絵を、静かに動かす」一枚絵ベースの縦型Reel。
// 背景（img2videoクリップ or 絵画調フォールバック）→ ヴィネット → 字幕 → エンドカード → 音声。
export const AoiReel: React.FC<ReelData> = (data) => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.deepNavy }}>
      <Background videoSrc={data.videoSrc} />
      <Vignette />
      <Subtitles cues={data.subtitles} />
      <EndCard
        line={data.endLine}
        lineFrom={data.endLineFrom}
        cta={data.endCta}
        ctaFrom={data.endCtaFrom}
      />
      {data.audioSrc ? <Audio src={staticFile(data.audioSrc)} /> : null}
      {data.bgmSrc ? <Audio src={staticFile(data.bgmSrc)} volume={0.18} /> : null}
    </AbsoluteFill>
  );
};
