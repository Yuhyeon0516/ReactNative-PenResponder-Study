import {View, Text} from 'react-native';
import React from 'react';

type BoxPropsType = {
  index: number;
  width: number;
};

export default function Box({index, width}: BoxPropsType) {
  return (
    <View
      style={{
        width: width,
        height: width,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 50, color: 'white'}}>{index}</Text>
    </View>
  );
}
