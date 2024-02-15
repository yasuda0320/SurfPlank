// BoardListScreen.tsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GridItem from './GridItem';
import { RootStackParamList } from './types';

type BoardListScreenRouteProp = RouteProp<RootStackParamList, 'BoardList'>;
// navigation プロパティの型を追加
type BoardListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardList'>;

interface BoardListScreenProps {
  route: BoardListScreenRouteProp;
  // navigation プロパティを追加
  navigation: BoardListScreenNavigationProp;
}

// useNavigation フックを使用して、navigation オブジェクトを取得
const BoardListScreen: React.FC<BoardListScreenProps> = ({ route }) => {
  const navigation = useNavigation<BoardListScreenNavigationProp>();
  const { categoryContent } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryContent}
        renderItem={({ item, index }) => (
          <GridItem
            name={item.board_name}
            isFirstRow={index < 2} // 最初の2アイテムで最初の行
            isLeftCell={index % 2 === 0} // 偶数インデックスが左側のセル
            onPress={() => navigation.navigate('ThreadList', { item })}
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
