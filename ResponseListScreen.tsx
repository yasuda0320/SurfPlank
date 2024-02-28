// ResponseListScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native'; // Added useNavigation import
import { RootStackParamList, ResponseContent } from './types';
import encoding from 'encoding-japanese';
import he from 'he';
import CustomHeaderTitle from './CustomHeaderTitle'; // Make sure to have the correct path

type ResponseListRouteProp = RouteProp<RootStackParamList, 'ResponseList'>;

interface ResponseListProps {
  route: ResponseListRouteProp;
}

const ResponseListScreen: React.FC<ResponseListProps> = ({ route }) => {
  const navigation = useNavigation(); // Obtained the navigation object
  const { boardUrl, datFileName, threadName } = route.params; // Assuming threadName is passed correctly
  const [responses, setResponses] = useState<ResponseContent[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle title={threadName || 'Thread'} />,
    });

    const fetchDatContent = async () => {
      try {
        const response = await fetch(`${boardUrl}dat/${datFileName}`);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const resultArray = encoding.convert(uint8Array, 'UNICODE', 'SJIS');
        const decodedText = encoding.codeToString(resultArray);

        const lines = decodedText.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(Boolean);

        const parsedResponses = lines.map((line) => {
          const parts = line.split('<>');
          const authorName = he.decode(parts[0].replace(/<\/?b>/g, ''));
          const contentLines = he.decode(parts[3].replace(/<br>/g, '\n'))
            .split('\n')
            .map(contentLine => contentLine.replace(/^ | $/g, ''));
          const processedContent = contentLines.join('\n');

          return {
            authorName: authorName,
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
  }, [boardUrl, datFileName, navigation, threadName]); // Added threadName and navigation to dependency array

  return (
    <ScrollView style={styles.container}>
      {responses.map((response, index) => (
        <View key={index} style={styles.response}>
          <View style={styles.responseHeader}>
            <Text style={styles.responseNumber}>{`${index + 1}`}</Text>
            <View style={styles.responseDetails}>
              <Text style={styles.authorName}>
                {`${response.authorName} ${response.email ? `${response.email} ` : ''}${response.dateIdBe}`}
              </Text>
            </View>
          </View>
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
    borderBottomColor: 'lightgray',
  },
  responseHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  responseNumber: {
    fontSize: 10,
    color: 'gray',
    marginRight: 10, // Adjust the space between the response number and the text
  },
  responseDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 10,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    color: 'black',
  },
});

export default ResponseListScreen;
