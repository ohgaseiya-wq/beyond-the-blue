import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { BRAND } from "../brand";

// 一枚絵をゆっくり呼吸させる（Ken Burns 風の微細なスケール）。
// クリップが尺より短い場合は loop で繰り返す。素材未生成なら絵画調グラデにフォールバック。
export const Background: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1.12]);

  if (!videoSrc) {
    // 素材を作る前でもプレビューできる絵画調の背景（静謐な青の滲み）
    const drift = interpolate(frame, [0, durationInFrames], [38, 54]);
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(125% 80% at 50% ${drift}%, ${BRAND.colors.blueMid}40, ${BRAND.colors.deepNavy} 68%)`,
        }}
      />
    );
  }

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <OffthreadVideo
        src={staticFile(videoSrc)}
        muted
        loop
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};
