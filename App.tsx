import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { styles } from './AppStyles';
import { CategoryItem, Category, BbsMenu } from './types';

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://menu.5ch.net/bbsmenu.json')
      .then(response => response.json())
      .then((data: BbsMenu) => { // ここでdataの型をBbsMenuにキャスト
        const categoryNames: Category[] = data.menu_list.map((item: CategoryItem) => ({
          id: item.category_number,
          name: item.category_name,
        }));
        setCategories(categoryNames);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
