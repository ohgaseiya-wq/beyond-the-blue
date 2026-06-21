import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { BRAND } from "../brand";
import { FONT_BODY } from "../fonts";
import type { SubtitleCue } from "../types";

// 下三分の一に、余白を広く。1キューずつフェードで出す（詰め込まない）。
export const Subtitles: React.FC<{ cues: SubtitleCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) {
    return null;
  }

  const fadeIn = interpolate(frame, [cue.from, cue.from + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [cue.to - 12, cue.to], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: BRAND.layout.safeBottom,
      }}
    >
      <div
        style={{
          maxWidth: BRAND.layout.subtitleMaxWidth,
          textAlign: "center",
          opacity,
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.7,
          color: BRAND.colors.text,
          textShadow: "0 2px 28px rgba(0,0,0,0.85)",
          letterSpacing: "0.02em",
          padding: "0 40px",
        }}
      >
        {cue.text}
      </div>
    </AbsoluteFill>
  );
};
