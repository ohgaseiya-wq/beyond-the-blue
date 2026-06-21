# Beyond the Blue — AI制作パイプライン

> コンテンツ制作の技術スタック・ワークフロー設計
> 方針: **Claude Codeで完結**（GUIツールを廃し、API・コード・MCPで一気通貫）
> 実装: `studio/`（Remotion製作ライン）に雛形あり
> 最終更新: 2026-06-21

## 設計思想

GUIツール（Midjourney / After Effects / DaVinci / n8n）は自動化しづらい。
**API・CLI・MCPで叩けるもの**に統一し、Claude Code自身をオーケストレーターにする。
これで人間の作業は「脚本のGOサインと最終チェックと投稿」だけになる。

## 制作パイプライン（新構成）

```
Claude Code（脚本・構成・オーケストレーション ← このリポが正本）
  ↓  ① 画像生成（fal MCP / @fal-ai/client）
Nano Banana 2（キャラ一貫性）/ Flux 2 / Seedream
  ↓  ② 一枚絵を動かす img2video（fal）
Kling 3.0（シネマ/絵画寄り・既定）/ Veo 3.1 / Seedance 2.0
  ↓  ③ AIナレーション
ElevenLabs v3（日本語・商用OK）/ Aivis Cloud / にじボイス
  ↓  ④ 組み立て・字幕・ブランド（コード）
Remotion（React→ffmpegで9:16 MP4。色/フォント/余白をコード固定。字幕はWhisper）
  ↓  ⑤ 配信
IG Graph API（任意・要ビジネスアカウント）/ まずは予約投稿の半自動
```

## 旧構成からの置き換え

| 工程 | 旧 | 新（Claude Code完結） |
|------|----|----|
| 画像 | Midjourney（API無し） | Nano Banana 2 / Flux（fal経由） |
| 動画 | After Effects | Kling / Veo（fal img2video） |
| 音声 | ElevenLabs | ElevenLabs v3（継続・日本語強化） |
| 編集 | DaVinci Resolve | Remotion（コード） |
| 自動化 | n8n | Claude Code 自身 |

## コンテンツ体裁

| 項目 | 設定 |
|------|------|
| 映像形式 | 一枚絵をimg2videoで静かに動かす × AIボイス × 字幕 |
| ビジュアル方向 | シネマ/絵画寄り（静謐・瞑想的。実写とイラストの中間） |
| 音声 | ElevenLabs（ナレーター。葵は喋らない） |
| トーン | 静かで深い（禅・瞑想的）。悟り五分五分 |
| 競合ポジション | 日本版 Pursuit of Wonder × キャラクターIP |

## プラットフォーム展開順序

```
Instagram Reels（フロント「あおい」・本命）
  ↓
TikTok（同じ素材を横展開・仮説検証）
  ↓
YouTube（長尺化・SEOメディアと連携）
```

## コンテンツ種別

| 種別 | 尺 | 用途 |
|------|-----|------|
| ショート | 30〜60秒 | Reels / Shorts。認知拡大・仮説検証 |
| ミドル | 3〜5分 | Instagram / YouTube。テーマ深堀り |
| ロング | 10〜20分 | YouTube。葵の物語エピソード |

## マネタイズ設計（3段階）

| Phase | 収益源 | タイミング |
|-------|--------|-----------|
| Phase 1 | 広告収益（YouTube / TikTok Creator Fund） | 初期 |
| Phase 2 | 低単価コミュニティ（Blue Movers Club的なもの） | フォロワー1万〜 |
| Phase 3 | ハイチケットへの裏導線（SFCとの接続） | 長期 |

## ビジュアル制作

### キャラ一貫性（最優先）

「同じ絵・同じあおい」を崩さないため、**キャラシートを一度固定**して全本で参照する。

- 画像生成は **Nano Banana 2**（参照画像でキャラ同一性を保持）を既定に
- あおいの固定要素: 中性的な顔立ち／ボロいダークグレーのパーカー／青く光る目
- 師: Accent Warm の色調で差別化
- → `studio/data/*.spec.json` の `image.referenceImageUrls` にキャラシートURLを固定

### カラーパレット（`studio/src/brand.ts` にコード化済み）

| 名前 | HEX | 用途 |
|------|-----|------|
| Blue Light | `#6BB8E0` | 葵の目、キーカラー |
| Blue Mid | `#7B8EC8` | グラデーション中間 |
| Purple | `#9B7BB8` | Epiphany、転換点 |
| Deep Navy | `#0A0E1A` | 背景 |
| Accent Warm | `#C8A87B` | 師（おじいさん）、温かみ |

### コスト感

60秒1本あたり、画像 $0.1〜0.3 ＋ 動画 $0.5〜2 ＋ 音声ほぼ無視 ＋ 組み立て無料 ≒ **$1〜3前後**。

## 関連

- 実装雛形: `studio/`（README参照）
- 運用設計: `knowledge/social/instagram-aoi-playbook.md`
- 脚本テンプレ・スターター: 同上 §8〜§9
