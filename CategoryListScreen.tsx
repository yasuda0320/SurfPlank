// CategoryListScreen.tsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GridItem from './GridItem'; // GridItemコンポーネントのインポート
import { Category, BbsMenu, RootStackParamList } from './types'; // 適切なパスに修正してください

const CategoryListScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // ナビゲーションオプションを動的に設定
    navigation.setOptions({ title: '5ちゃんねる' });
    fetch('https://menu.5ch.net/bbsmenu.json')
      .then(response => response.json())
      .then((data: BbsMenu) => {
        const categoryNames: Category[] = data.menu_list.map(item => ({
          id: item.category_number,
          name: item.category_name,
          content: item.category_content,
        }));
        setCategories(categoryNames);
      })
      .catch(error => console.error(error));
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <GridItem
            name={item.name}
            isFirstRow={false} // このプロパティはGridItem内で条件付きスタイルに使用されますが、この例では使用していません
            isLeftCell={false} // 同上
            onPress={() => navigation.navigate('BoardList', { categoryContent: item.content ?? [] })}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
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

export default CategoryListScreen;
