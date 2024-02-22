// ResponseListScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { RouteProp } from '@react-navigation/native';

type ResponseListRouteProp = RouteProp<RootStackParamList, 'ResponseList'>;

const ResponseListScreen: React.FC = () => {
  const route = useRoute<ResponseListRouteProp>();
  const { boardUrl, datFileName } = route.params;

  // ここでレスのデータを取得する処理を追加

  return (
    <View style={styles.container}>
      <Text>レス一覧画面</Text>
      {/* レスのデータを表示 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResponseListScreen;
