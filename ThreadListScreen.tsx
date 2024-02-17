// ThreadListScreen.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ThreadInfo } from './types';
import GridItem from './GridItem'; // GridItemのインポートを確認
import encoding from 'encoding-japanese';

type ThreadListScreenRouteProp = RouteProp<RootStackParamList, 'ThreadList'>;

interface ThreadListScreenProps {
  route: ThreadListScreenRouteProp;
}

const ThreadListScreen: React.FC<ThreadListScreenProps> = ({ route }) => {
  const [threads, setThreads] = useState<ThreadInfo[]>([]);
  const { item } = route.params;

  useEffect(() => {
    const fetchSubjectTxt = async () => {
      try {
        const response = await fetch(`${item.url}subject.txt`);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const resultArray = encoding.convert(uint8Array, 'UNICODE');
        const decodedText = encoding.codeToString(resultArray);

        const lines = decodedText.replace(/\r\n|\r|\n/g, '\n').split('\n');
        const threadInfos = lines.map(line => {
          const [datFileName, title] = line.split('<>');
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
  }, [item.url]);

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
