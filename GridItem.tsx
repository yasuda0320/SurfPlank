// GridItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GridItemProps {
  name: string;
  isFirstRow: boolean; // 最初の行かどうか
  isLeftCell: boolean; // 左側のセルかどうか
}

const GridItem: React.FC<GridItemProps> = ({ name, isFirstRow, isLeftCell }) => {
  return (
    <View style={[
      styles.item,
      isFirstRow && styles.firstRow,
      isLeftCell && styles.leftCell,
    ]}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100 / 2, // 高さを1/2に調整
    borderBottomWidth: 0.5, // 下側のグリッド線はすべてのセルに引く
  },
  firstRow: {
    borderTopWidth: 0.5, // 最初の行のみ上側にグリッド線
  },
  leftCell: {
    borderRightWidth: 0.5, // 各行の左側のセルのみ右側にグリッド線
  },
  itemText: {
    fontSize: 16,
  },
});

export default GridItem;
