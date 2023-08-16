import {View, Text, Animated, PanResponder} from 'react-native';
import React, {useRef} from 'react';

export default function BallThrow() {
  const panAnim = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panRes = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: panAnim.x, dy: panAnim.y}], {
      useNativeDriver: false,
    }),
    onPanResponderEnd: (event, gestureState) => {
      Animated.decay(panAnim, {
        velocity: {x: gestureState.vx / 10, y: gestureState.vy / 10},
        deceleration: 0.997,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderRelease: () => {
      setTimeout(() => {
        panAnim.setValue({x: 0, y: 50});
        Animated.spring(panAnim, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 7,
          tension: 30,
          useNativeDriver: true,
        }).start();
      }, 3000);
    },
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        {...panRes.panHandlers}
        style={{
          position: 'absolute',
          bottom: 20,
          transform: [
            {
              translateX: panAnim.x,
            },
            {
              translateY: panAnim.y,
            },
          ],
        }}>
        <Text style={{fontSize: 100, color: 'black'}}>🏀</Text>
      </Animated.View>
    </View>
  );
}
