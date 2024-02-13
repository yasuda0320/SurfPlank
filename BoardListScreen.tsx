// BoardListScreen.tsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import GridItem from './GridItem';
import { RootStackParamList } from './types';

type BoardListScreenRouteProp = RouteProp<RootStackParamList, 'BoardList'>;

interface BoardListScreenProps {
  route: BoardListScreenRouteProp;
}

const BoardListScreen: React.FC<BoardListScreenProps> = ({ route }) => {
  const { categoryContent } = route.params;

  // GridItemのonPressプロパティに渡すダミー関数
  // 実際のアプリでは、適切なアクションを実装してください
  const handlePress = () => {
    console.log('Item pressed');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryContent}
        renderItem={({ item, index }) => (
          <GridItem
            name={item.board_name}
            isFirstRow={index < 2} // 最初の2アイテムで最初の行
            isLeftCell={index % 2 === 0} // 偶数インデックスが左側のセル
            onPress={handlePress} // 実際には適切な処理を実装する
          />
        )}
        keyExtractor={(_, index) => `board-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default BoardListScreen;
