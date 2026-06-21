import { AbsoluteFill } from "remotion";
import { BRAND } from "../brand";

// シネマ/絵画寄りの静謐さ。四隅を Deep Navy に沈め、視線を中央に集める。
export const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(112% 76% at 50% 42%, transparent 52%, ${BRAND.colors.deepNavy}cc 100%)`,
        pointerEvents: "none",
      }}
    />
  );
};
