// App.tsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import GridItem from './GridItem';
import { CategoryItem, Category, BbsMenu } from './types';

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://menu.5ch.net/bbsmenu.json')
      .then(response => response.json())
      .then((data: BbsMenu) => {
        const categoryNames: Category[] = data.menu_list.map((item: CategoryItem) => ({
          id: item.category_number,
          name: item.category_name,
          content: item.category_content,
        }));
        setCategories(categoryNames);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <GridItem
            name={item.name}
            isFirstRow={index < 2} // 2列表示のため、最初の2アイテムが最初の行になる
            isLeftCell={index % 2 === 0} // 0と偶数インデックスが左側のセル
          />
        )}
        keyExtractor={item => item.id}
        // 2列で表示
        numColumns={2}
        // グリッドのアイテム間のスペースを調整するために必要
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default App;
