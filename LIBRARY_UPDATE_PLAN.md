# SurfPlank ライブラリ段階的更新計画

## 📊 現在の状況
- **現在のブランチ**: `library-update`
- **作業開始日**: 2025-06-14
- **フェーズ1**: ✅ 完了（コミット: ef8cf31）

## 🎯 段階的更新計画

### **フェーズ1: 基盤ライブラリの更新（低リスク）** ✅ 完了
1. **TypeScript 5.0.4 → 5.5.x** ✅
2. **ESLint 8.19.0 → 8.57.1** ✅ (9.xは互換性問題でロールバック)
3. **Prettier 2.8.8 → 3.5.3** ✅
4. **Jest 29.6.3 → 30.0.0** ✅

**テスト結果**: iOS/Android両方で動作確認済み

### **フェーズ2: React Navigation の更新（中リスク）** 🔄 次回実行予定
1. **@react-navigation/native 6.1.10 → 6.1.x最新**
2. **@react-navigation/stack 6.3.21 → 6.4.x**
3. **react-native-screens 3.29.0 → 3.34.x**
4. **react-native-gesture-handler 2.15.0 → 最新**
5. **react-native-safe-area-context 4.9.0 → 最新**

**テスト**: 全画面ナビゲーション動作確認

### **フェーズ3: React Native マイナー更新（中リスク）**
1. **React Native 0.73.11 → 0.74.x**
2. **React 18.2.0 → 18.3.x**
3. **関連する@react-native/*パッケージも連動更新**

**テスト**: iOS/Android両方でのフル機能テスト

### **フェーズ4: React Native メジャー更新（高リスク）**
1. **React Native 0.74.x → 0.75.x**
2. **New Architecture対応の準備**

**テスト**: 詳細な機能テスト、パフォーマンステスト

### **フェーズ5: React 19対応（最高リスク）**
1. **React 18.3.x → 19.x**
2. **React Native 0.75.x → 0.78.x以降**
3. **TypeScript strict mode対応**

**テスト**: 全機能の包括的テスト

## ⚠️ 重要な注意点

1. **各フェーズ間で必ず動作確認**
2. **5chのShift_JIS解析部分は特に注意深くテスト**
3. **iOS/Android両方での動作確認**
4. **ブランチを切って作業し、問題があれば即座にロールバック**
5. **各フェーズ完了後にコミット**

## 📋 フェーズ1完了時の設定変更

### 追加されたファイル
- `jest.setup.js`: Jest 30.x用のモック設定

### 設定変更
- `.eslintrc.js`: ESLint 8.x互換性設定
- `jest.config.js`: React Native用アセットモック設定
- `__tests__/App.test.tsx`: 簡略化されたテスト

### package.json更新内容
```json
{
  "devDependencies": {
    "typescript": "5.5",
    "eslint": "^8.57.1", 
    "prettier": "^3.5.3",
    "jest": "^30.0.0",
    "@typescript-eslint/eslint-plugin": "^8.34.0",
    "@typescript-eslint/parser": "^8.34.0",
    "eslint-plugin-ft-flow": "^3.0.11",
    "eslint-plugin-jest": "^28.13.5",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-native": "^5.0.0",
    "jest-transform-stub": "^2.0.0"
  }
}
```

## 🚀 作業再開時の手順

1. **現在の状況確認**
   ```bash
   git status
   git branch
   git log --oneline -5
   ```

2. **フェーズ2開始**
   ```bash
   git checkout -b phase2-react-navigation-update
   ```

3. **動作確認**
   ```bash
   npm run lint
   npm run test
   npx tsc --noEmit
   ```

4. **次フェーズの更新開始**
   - React Navigation関連パッケージの段階的更新
   - 各更新後の動作テスト

## 📚 参考情報

- **React Native最新版**: 0.80.0 (2024年12月時点)
- **React最新版**: 19.1.0 
- **New Architecture**: 0.76以降でデフォルト有効
- **重要な依存関係**: encoding-japanese, he, moment-timezone (5ch解析用)

---
生成日: 2025-06-14
作成者: Claude Code