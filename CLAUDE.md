# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 使用言語

質問と回答、説明には日本語を使用する

## ファイル作成・編集ルール

### 改行コード

- ファイルの終端は必ず LF（\n）にする
- 既に終端が LF の場合は追加しない（重複を避ける）
- これはすべてのテキストファイル（.md、.js、.ts、.py 等）に適用する

### フォーマット

- 空白だけの行は改行文字のみにする（空白文字を含めない）
- 文章の末尾の空白は削除する
- 行末に不要な空白文字を残さない

## Project Overview

SurfPlank is a React Native app for browsing 5channel (5ch.net), Japan's largest anonymous forum. The app provides hierarchical navigation through categories → boards → threads → responses.

## Development Commands

```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator/device
npm run lint       # Run ESLint
npm test           # Run Jest tests
```

## Architecture & Navigation Flow

The app uses React Navigation Stack with this linear flow:

1. **CategoryListScreen** → Fetches categories from `https://menu.5ch.net/bbsmenu.json`
2. **BoardListScreen** → Displays boards within a category
3. **ThreadListScreen** → Shows threads from `{boardUrl}subject.txt`
4. **ResponseListScreen** → Displays posts from `{boardUrl}dat/{datFileName}`

Navigation params are typed in `types.ts` as `RootStackParamList`.

## Critical Technical Details

### Text Encoding

All 5ch content is Shift_JIS encoded. Must convert using:

```typescript
const uint8Array = new Uint8Array(arrayBuffer);
const resultArray = encoding.convert(uint8Array, 'UNICODE', 'SJIS');
const decodedText = encoding.codeToString(resultArray);
```

### Data Parsing

- Thread lists: Parse lines with format `{datFileName}.dat<>{title} ({responseCount})`
- Responses: Parse `<>` delimited format for author, email, timestamp, content
- HTML entities must be decoded using `he.decode()`
- Thread timestamps extracted from dat filenames (10-digit Unix timestamp)

### Thread Momentum Calculation

```typescript
const momentum = parseFloat(responseCount) / daysDiff;
```

Display as "0.0" when NaN or Infinity.

## Key Dependencies

- **encoding-japanese**: Shift_JIS to Unicode conversion
- **he**: HTML entity decoding
- **moment-timezone**: JST date formatting with Japanese locale

## Current Implementation Status

- ✅ Full navigation and viewing functionality
- ✅ Thread metadata (creation date, response count, momentum)
- ✅ Image preview in responses
- ❌ Posting/creating content
- ❌ Error handling and loading states
- ❌ Response pagination (loads all at once)

## Library Update Progress

**Current Status**: フェーズ1完了 (2025-06-14)

**Completed**:
- ✅ フェーズ1: 基盤ライブラリ更新 (TypeScript 5.5, Jest 30.0.0, Prettier 3.5.3, ESLint 8.57.1)

**Next Steps**:
- 🔄 フェーズ2: React Navigation更新
- ⏳ フェーズ3: React Native 0.74.x更新
- ⏳ フェーズ4: React Native 0.75.x更新  
- ⏳ フェーズ5: React 19対応

**Reference**: 詳細な更新計画は `LIBRARY_UPDATE_PLAN.md` を参照

## Common Patterns

- **GridItem** component used across all screens for consistent UI
- Inline fetch calls in components (no service layer)
- All screens at root level (no folder structure)
- Navigation title set dynamically in useEffect
