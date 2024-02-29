// ResponseListScreen.tsx

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, Linking} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, ResponseContent} from './types';
import encoding from 'encoding-japanese';
import he from 'he';
import CustomHeaderTitle from './CustomHeaderTitle';

type ResponseListRouteProp = RouteProp<RootStackParamList, 'ResponseList'>;

interface ResponseListProps {
  route: ResponseListRouteProp;
}

const ResponseListScreen: React.FC<ResponseListProps> = ({route}) => {
  const navigation = useNavigation();
  const {boardUrl, datFileName, threadName} = route.params;
  const [responses, setResponses] = useState<ResponseContent[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

        const lines = decodedText
          .replace(/\r\n|\r|\n/g, '\n')
          .split('\n')
          .filter(Boolean);

        const parsedResponses = lines.map(line => {
          const parts = line.split('<>');
          const authorName = he.decode(parts[0].replace(/<\/?b>/g, ''));
          const contentLines = he
            .decode(parts[3].replace(/<br>/g, '\n'))
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

  const renderContentWithImages = (content: string) => {
    const imageRegex = /https?:\/\/\S+\.(jpg|jpeg|png|gif)/gi;
    let images: string[] = [];
    let textContent = content.replace(imageRegex, (match) => {
      images.push(match);
      return ` ${match} `;
    }).trim();

    return (
      <>
        <Text style={styles.contentText}>
          {textContent.split(' ').map((part, index) => {
            if (part.match(imageRegex)) {
              return (
                <Text
                  key={index}
                  onPress={() => Linking.openURL(part)}
                  style={styles.link}>
                  {part + " "}
                </Text>
              );
            } else {
              return part + ' ';
            }
          })}
        </Text>
        <View style={styles.imagesContainer}>
          {images.map((imageSrc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedImage(imageSrc);
                setModalVisible(true);
              }}>
              <Image source={{ uri: imageSrc }} style={styles.inlineImage} />
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {responses.map((response, index) => (
          <View key={index} style={styles.response}>
            <View style={styles.responseHeader}>
              <Text style={styles.responseNumber}>{`${index + 1}`}</Text>
              <View style={styles.responseDetails}>
                <Text style={styles.authorName}>
                  {`${response.authorName} ${
                    response.email ? `${response.email} ` : ''
                  }${response.dateIdBe}`}
                </Text>
              </View>
            </View>
            <View>{renderContentWithImages(response.content)}</View>
          </View>
        ))}
      </ScrollView>
      {selectedImage && (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setModalVisible(!modalVisible)}>
            <Image source={{uri: selectedImage}} style={styles.fullSizeImage} />
          </TouchableOpacity>
        </Modal>
      )}
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  fullSizeImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  contentText: {
    fontSize: 16,
    color: 'black',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // 画像が左詰めで表示されるように
    marginTop: 10, // テキストコンテンツと画像の間に余白を設ける
  },
  inlineImage: {
    width: 100, // 画像のサイズ調整
    height: 100,
    resizeMode: 'contain',
    marginRight: 5, // 画像同士の間隔
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ResponseListScreen;
