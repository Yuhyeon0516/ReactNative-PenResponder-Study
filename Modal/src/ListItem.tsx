import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type ListItemPropsType = {
  color: string;
  iconName: string;
  title: string;
  onPress: () => void;
};

export default function ListItem({
  onPress,
  color,
  iconName,
  title,
}: ListItemPropsType) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#1f1f1f30',
          borderBottomWidth: 1,
          height: 60,
        }}>
        <Icon name={iconName} size={20} color={color} />
        <Text style={{fontSize: 15, marginLeft: 20, color: color}}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
