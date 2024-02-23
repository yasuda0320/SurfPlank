// GridItem.tsx

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GridItemProps {
  name: string;
  isFirstRow: boolean; // 最初の行かどうか
  isLeftCell: boolean; // 左側のセルかどうか
  onPress: () => void; // タップ時のイベントハンドラ
}

const GridItem: React.FC<GridItemProps> = ({ name, isFirstRow, isLeftCell, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        isFirstRow && styles.firstRow,
        isLeftCell && styles.leftCell,
      ]}
      onPress={onPress} // TouchableOpacityを使用してonPressを適用
    >
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    padding: 15, // セルのパディングを15に設定
    borderBottomWidth: 0.5, // 下側のグリッド線はすべてのセルに引く
    // heightプロパティを削除して自動高さ調整を許可
  },
  firstRow: {
    borderTopWidth: 0.5, // 最初の行のみ上側にグリッド線
  },
  leftCell: {
    borderRightWidth: 0.5, // 各行の左側のセルのみ右側にグリッド線
  },
  itemText: {
    fontSize: 16,
    textAlign: 'left', // テキストを左寄せに設定
    color: 'black', // テキストの色を黒に設定
  },
});

export default GridItem;
