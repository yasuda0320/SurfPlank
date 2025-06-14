// CustomHeaderTitle.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CustomHeaderTitleProps {
  title: string;
}

const CustomHeaderTitle: React.FC<CustomHeaderTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      {/* numberOfLinesを2に設定して2行表示を可能にします */}
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5, // コンテナのパディングを調整
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomHeaderTitle;
