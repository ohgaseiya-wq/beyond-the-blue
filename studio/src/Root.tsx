import { Composition } from "remotion";
import { AoiReel } from "./AoiReel";
import { BRAND } from "./brand";
import type { ReelData } from "./types";
import epS01 from "../data/ep-s01.json";

const defaultData = epS01 as ReelData;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AoiReel"
      component={AoiReel}
      durationInFrames={defaultData.durationInFrames}
      fps={BRAND.layout.fps}
      width={BRAND.layout.width}
      height={BRAND.layout.height}
      defaultProps={defaultData}
      // data JSON 側の値で尺・fps を上書きできるようにする
      calculateMetadata={({ props }) => ({
        durationInFrames: props.durationInFrames,
        fps: props.fps ?? BRAND.layout.fps,
      })}
    />
  );
};
