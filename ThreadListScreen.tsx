// ThreadListScreen.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native'; // useNavigationをインポート
import { RootStackParamList, ThreadInfo } from './types';
import GridItem from './GridItem';
import encoding from 'encoding-japanese';
import he from 'he';

type ThreadListScreenRouteProp = RouteProp<RootStackParamList, 'ThreadList'>;

interface ThreadListScreenProps {
  route: ThreadListScreenRouteProp;
}

const ThreadListScreen: React.FC<ThreadListScreenProps> = ({ route }) => {
  const [threads, setThreads] = useState<ThreadInfo[]>([]);
  const { item } = route.params;
  const navigation = useNavigation(); // useNavigationフックを使用

  useEffect(() => {
    navigation.setOptions({ title: item.board_name }); // item.board_nameをタイトルとして設定
    const fetchSubjectTxt = async () => {
      try {
        const response = await fetch(`${item.url}subject.txt`);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const resultArray = encoding.convert(uint8Array, 'UNICODE', 'SJIS');
        const decodedText = encoding.codeToString(resultArray);

        const lines = decodedText.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(Boolean);
        const threadInfos = lines.map(line => {
          const parts = line.split('<>');
          const datFileName = parts[0];
          // parts[1]がundefinedの場合は空文字列''を使用
          const rawTitle = parts[1] || '';
          const title = he.decode(rawTitle); // HTMLエンティティをデコード
          return { datFileName, title };
        }).filter(thread => thread.title && thread.datFileName);

        setThreads(threadInfos);
      } catch (error) {
        console.error('Failed to fetch or convert subject.txt', error);
      }
    };

    // 非同期関数を即時実行
    (async () => {
      await fetchSubjectTxt();
    })();
  }, [item, navigation]); // 依存配列にitemとnavigationを追加

  return (
    <ScrollView style={styles.container}>
      {threads.map((thread, index) => (
        <GridItem
          key={index}
          name={thread.title}
          isFirstRow={index === 0}
          isLeftCell={false} // 1行に1カラムのため、常にfalse
          onPress={() => {/* スレッド選択時の動作 */}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThreadListScreen;
