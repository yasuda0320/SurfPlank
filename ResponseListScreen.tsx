import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ResponseContent } from './types';
import encoding from 'encoding-japanese';

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
          // ResponseContent の形式に従ってデータを構築
          return {
            authorName: parts[0],
            email: parts[1],
            dateIdBe: parts[2],
            content: parts[3],
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
    borderBottomColor: '#ccc',
  },
  authorName: {
    fontWeight: 'bold',
  },
  dateIdBe: {
    fontStyle: 'italic',
  },
  content: {
    marginTop: 5,
  },
});

export default ResponseListScreen;
