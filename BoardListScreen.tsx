// BoardListScreen.tsx

import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // 'types.ts'で定義した型のインポートパスを調整

type BoardListScreenRouteProp = RouteProp<RootStackParamList, 'BoardList'>;
type BoardListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardList'>;

interface BoardListScreenProps {
  route: BoardListScreenRouteProp;
  navigation: BoardListScreenNavigationProp;
}

const BoardListScreen: React.FC<BoardListScreenProps> = ({ route }) => {
  const { categoryContent } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryContent}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.board_name}</Text>
          </View>
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
  item: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // 背景色を薄いグレーに設定
  },
  itemText: {
    fontSize: 16,
  },
});

export default BoardListScreen;
