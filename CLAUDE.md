# Beyond the Blue — Project CLAUDE.md

> YouTubeチャンネル「Beyond the Blue®︎」のメディアプロジェクト
> 最終更新: 2026-04-07

## Overview

**Beyond the Blue** は、AIが支配する論理の世界の「向こう側」にある見えない法則体系を、
キャラクター「葵（Aoi）」の物語を通じて描くメディアIPプロジェクト。

- **ジャンル**: フィクション × 思想体験メディア（日本版 Pursuit of Wonder × キャラクターIP）
- **ターゲット**: 知的好奇心が高い20〜35歳。キラキラ系に疲れた層
- **Core Thesis**: 「論理の先に、もう一つの法則がある。古代人はそれを知っていた。成功者はそれを使っている。AIには、それが見えない。」

## Brand Identity

- **ドメイン**: bluemover.jp（SWELL + SWELL Child）
- **カラーパレット**:
  - Blue Light: `#6BB8E0`
  - Blue Mid: `#7B8EC8`
  - Purple: `#9B7BB8`
  - Deep Navy: `#0A0E1A`
  - Accent Warm: `#C8A87B`
- **フォント**:
  - Display: Cormorant Garamond (300/400)
  - Body: Zen Kaku Gothic New (300/400/500/700)
  - Mono: IBM Plex Mono (300/400)
- **トーン**: 静謐、知的、余韻を残す。教えない・上から目線を排除

## WordPress サイト（bluemover.jp）

```bash
# SSH + wp-cli でアクセス（CLAUDE.mdグローバル設定準拠）
ssh xserver '/usr/bin/php8.1 /usr/bin/wp --path=/home/theacademy/bluemover.jp/public_html {command}'
```

| 項目 | 設定 |
|------|------|
| テーマ | SWELL + SWELL Child |
| フロントページ | 固定ページ「Beyond the Blue」(ID:17) |
| ブログページ | 固定ページ「Journal」(ID:18) |
| プラグイン | SEO SIMPLE PACK / Simple Local Avatars / CloudSecure |

### カテゴリ

| カテゴリ | slug | 用途 |
|---------|------|------|
| Nologic Laws | nologic-laws | 葵が発見する見えない法則（デフォルト） |
| Blue Movers Journey | blue-movers-journey | 葵の旅路・試練と発見 |
| Ancient Meets Modern | ancient-meets-modern | 古典×現代成功哲学の交差点 |
| Beyond the Blue Stories | stories | フィクション物語 |
| World Notes | world-notes | 制作ノート・裏話 |

### カスタムCSS
- SWELL子テーマ `style.css` にBeyond the Blueブランドカラーを実装済み
- CSS変数: `--btb-blue-light`, `--btb-blue-mid`, `--btb-purple`, `--btb-deep-navy` 等

## Key Assets

| Asset | Path |
|-------|------|
| World Bible v1.0 | `knowledge/brand/world-bible-v1.html` |
| カスタムCSS | サーバー上: `swell_child/style.css` |

## Storytelling Rules（7つの戒律）

1. **Show, Never Tell** — 法則を解説しない。体験で描く
2. **Pain Before Wisdom** — 気づきの前に必ず痛みを描く
3. **End with a Question** — 答えを出さず問いで終わる
4. **Ancient Meets Modern** — 古典×現代成功哲学の交差点
5. **The Mud is the Message** — 泥臭さこそ葵の魅力
6. **Silence is a Character** — 沈黙を演出として活用
7. **No Guru Energy** — 教えるのではなく一緒に探す
