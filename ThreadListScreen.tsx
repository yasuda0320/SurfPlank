// ThreadListScreen.tsx

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import encoding from 'encoding-japanese';

type ThreadListScreenRouteProp = RouteProp<RootStackParamList, 'ThreadList'>;

interface ThreadListScreenProps {
  route: ThreadListScreenRouteProp;
}

const ThreadListScreen: React.FC<ThreadListScreenProps> = ({ route }) => {
  const [subjectList, setSubjectList] = useState<string>('Loading...');
  const { item } = route.params;

  useEffect(() => {
    const fetchSubjectTxt = async () => {
      try {
        const response = await fetch(`${item.url}subject.txt`);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        // UNICODEへの変換を指示
        const resultArray = encoding.convert(uint8Array, 'UNICODE');
        // 変換された数値配列を文字列に変換
        const decodedText = encoding.codeToString(resultArray);
        setSubjectList(decodedText);
      } catch (error) {
        console.error('Failed to fetch or convert subject.txt', error);
        setSubjectList('Failed to load content.');
      }
    };

    fetchSubjectTxt();
  }, [item.url]);

  return (
    <ScrollView style={styles.container}>
      <Text>Board Name: {item.board_name}</Text>
      <Text>URL: {item.url}</Text>
      <Text>{subjectList}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ThreadListScreen;
