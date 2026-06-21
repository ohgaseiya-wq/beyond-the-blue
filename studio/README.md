# BTB Studio — あおい Reels 制作ライン

> Beyond the Blue® / Instagram「あおい」のショート動画を **Claude Code から一気通貫**で作るための雛形。
> 一枚の絵を生成 → 静かに動かす → AI音声でアフレコ → ブランド字幕を乗せて 9:16 MP4 を書き出す。

## 構成（全部 コード / CLI / MCP で完結）

```
脚本(Claude Code) → ①画像(fal: Nano Banana 2) → ②img2video(fal: Kling/Veo)
                  → ③音声(ElevenLabs) → ④組み立て・字幕・ブランド(Remotion) → ⑤9:16 MP4
```

- **生成（①②③）**: `scripts/generate.mjs` … fal と ElevenLabs を叩いて素材を作る
- **組み立て（④⑤）**: Remotion … `src/` に動画がコードで定義されている（BTBの色・フォント・余白を固定）
- **データ**: `data/ep-XX.spec.json`（生成スペック＝プロンプト/ナレ）と `data/ep-XX.json`（レンダ用＝字幕/尺）

## セットアップ

```bash
cd studio
npm install
cp .env.example .env   # FAL_KEY / ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID を記入
```

APIキー:
- fal … <https://fal.ai/dashboard/keys>
- ElevenLabs … <https://elevenlabs.io/app/settings/api-keys>（声は Voice Library で選んでID固定）

## 使い方

```bash
# プレビュー（素材が無くても絵画調フォールバックで表示される）
npm run studio

# EP-S01「197冊」を生成（画像→動画→音声）
npm run generate ep-s01      # = node scripts/generate.mjs ep-s01

# 字幕タイミングを耳で微調整（data/ep-s01.json の subtitles）

# 9:16 MP4 を書き出し
npm run build:ep             # = node scripts/build-reel.mjs ep-s01

# 生成＋書き出しを一気に
npm run make:ep
```

出力は `out/ep-s01.mp4`。

## 新しい1本を増やす（量産の型）

1. `data/ep-s02.spec.json` と `data/ep-s02.json` を ep-s01 を複製して作る
2. プロンプト・ナレ・字幕を差し替える（脚本テンプレは `../knowledge/social/instagram-aoi-playbook.md` §8）
3. `node scripts/generate.mjs ep-s02 && node scripts/build-reel.mjs ep-s02`

> Claude Code に「EP-S03 を playbook の脚本から作って」と頼めば、spec/data の生成までやらせられる。

## fal MCP（対話で使う場合）

スクリプトを書かずに Claude Code から直接モデルを叩きたいときは fal MCP を足す:

```bash
claude mcp add --transport http fal-ai https://mcp.fal.ai/mcp \
  --header "Authorization: Bearer $FAL_KEY"
```

これで Claude Code から 1,000+ モデルを search / run できる（モデルIDの確認にも便利）。

## モデル選定（2026-06 時点・`data/*.spec.json` の `models`）

| 役割 | 既定 | 代替 |
|------|------|------|
| 画像（キャラ一貫性） | `fal-ai/nano-banana/v2` | Flux 2 / Seedream |
| img2video（シネマ/絵画寄り） | `fal-ai/kling-video/v2/...` | Veo 3.1 / Seedance |
| 音声（日本語ナレ） | ElevenLabs `eleven_v3` | Aivis Cloud / にじボイス |

> ⚠️ fal のエンドポイントIDは更新が早い。動かす前に fal.ai/models（または fal MCP search）で最新を確認すること。

## 字幕の自動化（任意）

今は手書きキューだが、`@remotion/install-whisper-cpp` で生成済み音声から単語タイムスタンプを取り、
`data/*.json` の subtitles を自動生成できる。精度が要る回だけ手で微調整する運用が速い。
