import {View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

type PointerPropsType = {
  focus: number;
  index: number;
  onButtonNavigation: (index: number) => void;
};

export default function Pointer({
  focus,
  index,
  onButtonNavigation,
}: PointerPropsType) {
  return (
    <TouchableWithoutFeedback onPress={() => onButtonNavigation(index)}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: focus === index ? '#555' : '#55555550',
        }}
      />
    </TouchableWithoutFeedback>
  );
}
