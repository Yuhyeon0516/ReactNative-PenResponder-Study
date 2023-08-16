import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextStyle,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function FontSlider() {
  const [step, setStep] = useState(0);

  const FONT: {title: TextStyle; body: TextStyle}[] = [
    {
      title: {fontSize: 20, lineHeight: 32, color: 'black'},
      body: {fontSize: 14, color: 'black'},
    },
    {
      title: {fontSize: 26, lineHeight: 38, color: 'black'},
      body: {fontSize: 18, color: 'black'},
    },
    {
      title: {fontSize: 32, lineHeight: 44, color: 'black'},
      body: {fontSize: 22, color: 'black'},
    },
    {
      title: {fontSize: 38, lineHeight: 50, color: 'black'},
      body: {fontSize: 26, color: 'black'},
    },
  ];

  const circleAnim = useRef(new Animated.Value(0)).current;

  const panRes = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gestureState) => {
      circleAnim.setValue(gestureState.dx + step * 50);
    },
    onPanResponderEnd: (event, gestureState) => {
      const nextStep = step + Math.round(gestureState.dx / 50);
      const moveValue = nextStep * 50;

      setStep(nextStep);

      Animated.spring(circleAnim, {
        toValue: moveValue,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }).start();
    },
  });

  function onPress(index: number) {
    setStep(index);

    Animated.spring(circleAnim, {
      toValue: index * 50,
      friction: 7,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: 200,
          height: 150,
          justifyContent: 'flex-end',
        }}>
        <View>
          <Text style={FONT[step].title}>Font Step {step + 1}</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              top: 25,
              width: 150,
              borderBottomColor: '#ddd',
              borderBottomWidth: 2,
            }}
          />

          <View style={{flexDirection: 'row'}}>
            {[...Array(4)].map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => onPress(index)}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#ddd',
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>

          <Animated.View
            {...panRes.panHandlers}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#333',
              position: 'absolute',
              left: 25 - 10,
              transform: [
                {
                  translateX: circleAnim,
                },
              ],
            }}
          />
        </View>
      </View>
    </View>
  );
}
