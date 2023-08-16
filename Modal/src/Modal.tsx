import {
  Animated,
  Button,
  Easing,
  PanResponder,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from './ListItem';

export default function Modal() {
  const safeAreaInset = useSafeAreaInsets();
  const [show, setShow] = useState(false);

  const interpolateAnim = useRef(new Animated.Value(0)).current;

  const panRes = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 100) {
        hideModal();
      }
    },
  });

  function hideModal() {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setShow(false);
      }
    });
  }

  function showModal() {
    setShow(true);

    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <Button title="Show Modal" onPress={showModal} />
      </SafeAreaView>
      {show && (
        <>
          <TouchableWithoutFeedback onPress={hideModal}>
            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000090',
                opacity: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            {...panRes.panHandlers}
            style={{
              position: 'absolute',
              bottom: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-500, 0],
              }),
              borderWidth: 1,
              backgroundColor: 'white',
              width: '100%',
              padding: 20,
              paddingBottom: 20 + safeAreaInset.bottom,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}>
            <ListItem
              onPress={hideModal}
              color="#333"
              iconName="pushpino"
              title="저장하기"
            />
            <ListItem
              onPress={hideModal}
              color="#333"
              iconName="hearto"
              title="좋아요"
            />
            <ListItem
              onPress={hideModal}
              color="#333"
              iconName="delete"
              title="삭제하기"
            />
            <ListItem
              onPress={hideModal}
              color="#888"
              iconName="back"
              title="닫기"
            />
          </Animated.View>
        </>
      )}
    </View>
  );
}
