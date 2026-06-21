// フォント読込（Remotion バンドル側＝コンポーネントからのみ import すること）。
// Body: Zen Kaku Gothic New / Display: Cormorant Garamond（CLAUDE.md のブランド指定）。

import { loadFont as loadBody } from "@remotion/google-fonts/ZenKakuGothicNew";
import { loadFont as loadDisplay } from "@remotion/google-fonts/CormorantGaramond";

// 日本語グリフのため subset に "japanese" を含める。
const body = loadBody("normal", {
  weights: ["300", "400", "500"],
  subsets: ["japanese", "latin"],
});

const display = loadDisplay("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
});

export const FONT_BODY = body.fontFamily;
export const FONT_DISPLAY = display.fontFamily;
