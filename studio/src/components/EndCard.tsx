import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { BRAND } from "../brand";
import { FONT_BODY } from "../fonts";

// 締めの一文（語り）→ 静かなCTA。CTAはブルー→パープルのグラデ文字（Epiphany）。
export const EndCard: React.FC<{
  line: string;
  lineFrom: number;
  cta: string;
  ctaFrom: number;
}> = ({ line, lineFrom, cta, ctaFrom }) => {
  const frame = useCurrentFrame();
  if (frame < lineFrom) {
    return null;
  }

  const lineOpacity = interpolate(frame, [lineFrom, lineFrom + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(frame, [ctaFrom, ctaFrom + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ textAlign: "center", padding: "0 80px" }}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 300,
            fontSize: 58,
            lineHeight: 1.7,
            color: BRAND.colors.text,
            marginBottom: 52,
            opacity: lineOpacity,
            textShadow: "0 2px 28px rgba(0,0,0,0.85)",
          }}
        >
          {line}
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 46,
            letterSpacing: "0.1em",
            opacity: ctaOpacity,
            backgroundImage: `linear-gradient(90deg, ${BRAND.colors.blueLight}, ${BRAND.colors.blueMid}, ${BRAND.colors.purple})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
