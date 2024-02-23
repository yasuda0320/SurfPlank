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
        const resultArray = encoding.convert(uint8Array, 'UNICODE', 'SJIS');
        const decodedText = encoding.codeToString(resultArray);

        const lines = decodedText.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(Boolean);

        const parsedResponses = lines.map((line, index) => {
          const parts = line.split('<>');
          const authorName = he.decode(parts[0].replace(/<\/?b>/g, ''));
          const contentLines = he.decode(parts[3].replace(/<br>/g, '\n'))
            .split('\n')
            .map(contentLine => contentLine.replace(/^ | $/g, ''));
          const processedContent = contentLines.join('\n');

          return {
            authorName: `${index + 1} ${authorName}`, // レス番号を追加
            email: parts[1],
            dateIdBe: parts[2],
            content: processedContent,
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
