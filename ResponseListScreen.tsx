import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ResponseContent } from './types';
import encoding from 'encoding-japanese';
import he from 'he';

type ResponseListRouteProp = RouteProp<RootStackParamList, 'ResponseList'>;

interface ResponseListProps {
  route: ResponseListRouteProp;
}

const ResponseListScreen: React.FC<ResponseListProps> = ({ route }) => {
  const { boardUrl, datFileName } = route.params;
  const [responses, setResponses] = useState<ResponseContent[]>([]);

  useEffect(() => {
    const fetchDatContent = async () => {
      try {
        const response = await fetch(`${boardUrl}dat/${datFileName}`);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        // Shift_JIS (SJIS) から Unicode への変換を行います。
        const resultArray = encoding.convert(uint8Array, 'UNICODE', 'SJIS');
        const decodedText = encoding.codeToString(resultArray);

        // 改行コードに対応して、最後の空行を避けるために filter(Boolean) を使用
        const lines = decodedText.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(Boolean);

        // レスポンス内容の解析
        const parsedResponses = lines.map(line => {
          const parts = line.split('<>');
          // <b>タグを削除してからauthorNameのHTMLエンティティをデコード
          const authorName = he.decode(parts[0].replace(/<\/?b>/g, ''));
          // contentの加工: <br>を改行に置き換え、デコード後に各行の先頭と末尾のスペースを削除
          const contentLines = he.decode(parts[3].replace(/<br>/g, '\n'))
            .split('\n')
            .map(contentLine => contentLine.replace(/^ | $/g, '')); // 先頭と末尾のスペースを削除
          const processedContent = contentLines.join('\n');

          return {
            authorName: authorName,
            email: parts[1], // emailはデコード不要
            dateIdBe: parts[2], // dateIdBeはデコード不要
            content: processedContent, // contentのHTMLエンティティをデコード
            // threadTitleはレス一覧には含まれないため、ここでは扱わない
          };
        });

        setResponses(parsedResponses);
      } catch (error) {
        console.error('Failed to fetch or convert DAT content', error);
      }
    };

    (async () => {
      await fetchDatContent();
    })();
  }, [boardUrl, datFileName]);

  return (
    <ScrollView style={styles.container}>
      {responses.map((response, index) => (
        <View key={index} style={styles.response}>
          <Text style={styles.authorName}>{response.authorName}</Text>
          <Text style={styles.dateIdBe}>{response.dateIdBe}</Text>
          <Text style={styles.content}>{response.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  response: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray', // 色名で指定
  },
  authorName: {
    fontSize: 12, // 少し小さめのサイズ
    color: 'gray', // 薄い色に変更
  },
  dateIdBe: {
    fontSize: 12, // 少し小さめのサイズ
    color: 'gray', // 薄い色に変更
  },
  content: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default ResponseListScreen;
