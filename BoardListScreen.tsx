// BoardListScreen.tsx

import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GridItem from './GridItem';
import { RootStackParamList } from './types';

type BoardListScreenRouteProp = RouteProp<RootStackParamList, 'BoardList'>;

interface BoardListScreenProps {
  route: BoardListScreenRouteProp;
}

const BoardListScreen: React.FC<BoardListScreenProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'BoardList'>>();
  const { categoryContent, categoryName } = route.params; // categoryNameを受け取る

  // コンポーネントがマウントされた時にタイトルを設定
  useEffect(() => {
    navigation.setOptions({ title: categoryName }); // 受け取ったカテゴリ名をタイトルとして設定
  }, [categoryName, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryContent}
        renderItem={({ item, index }) => (
          <GridItem
            name={item.board_name}
            isFirstRow={index < 2}
            isLeftCell={index % 2 === 0}
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
