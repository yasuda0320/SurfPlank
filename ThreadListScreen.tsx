// ThreadListScreen.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ThreadInfo } from './types';
import GridItem from './GridItem';
import encoding from 'encoding-japanese';
import he from 'he';
import moment from 'moment-timezone'; // moment-timezoneをインポート
import 'moment/locale/ja'; // 日本語のロケールをインポート

type ThreadListScreenRouteProp = RouteProp<RootStackParamList, 'ThreadList'>;
type ThreadListScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface ThreadListScreenProps {
  route: ThreadListScreenRouteProp;
}

const convertUnixTimeToJST = (unixTime: number) => {
  return moment(unixTime * 1000).tz('Asia/Tokyo').locale('ja').format('M/D(ddd) HH:mm');
};

const calculateThreadMomentum = (createdAt: string, responseCount: string) => {
  const createdMoment = moment(createdAt, 'M/D(ddd) HH:mm');
  const currentMoment = moment();
  const daysDiff = currentMoment.diff(createdMoment, 'days', true);
  const momentum = parseFloat(responseCount) / daysDiff;
  if (isNaN(momentum) || !isFinite(momentum)) {
    return '0.0';
  }
  return momentum.toFixed(1);
};

const ThreadListScreen: React.FC<ThreadListScreenProps> = ({ route }) => {
  const [threads, setThreads] = useState<ThreadInfo[]>([]);
  const { item } = route.params;
  const navigation = useNavigation<ThreadListScreenNavigationProp>();

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
          const decodedTitle = he.decode(rawTitle);
          // 空白の有無を考慮した正規表現の修正
          const titleMatch = decodedTitle.match(/^(.*?)(?: *\[([^\]]+)] *)?\(([^)]+)\)$/);
          const title = titleMatch ? titleMatch[1].trim() : decodedTitle; // タイトルの後ろの空白を削除
          const threadId = titleMatch && titleMatch[2] ? titleMatch[2] : '';
          const responseCount = titleMatch ? titleMatch[3] : '';
          const createdAt = convertUnixTimeToJST(parseInt(datFileName, 10)); // Unix時間をJSTに変換
          const momentum = calculateThreadMomentum(createdAt, responseCount); // スレッドの勢いを計算
          return { datFileName, title, threadId, responseCount, createdAt, momentum };
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
          onPress={() => navigation.navigate('ResponseList', {
            boardUrl: item.url, // 板のURL
            datFileName: thread.datFileName, // 選択されたスレッドのdatファイル名
            threadName: thread.title, // スレッド名を渡す
          })}
          footerContent={{
            createdAt: thread.createdAt,
            threadId: thread.threadId,
            momentum: thread.momentum, // スレッドの勢いを追加
            responseCount: thread.responseCount,
          }}
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
