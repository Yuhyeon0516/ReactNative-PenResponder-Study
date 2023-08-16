import {View, useWindowDimensions, Animated, PanResponder} from 'react-native';
import React, {useRef, useState} from 'react';
import Pointer from './Pointer';
import Box from './Box';

export default function Banner() {
  const {width} = useWindowDimensions();
  const [focus, setFocus] = useState(0);

  const bannerAnim = useRef(new Animated.Value(0)).current;

  const pandingRef = useRef(true);
  const panRes = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const toRight = gestureState.dx < -80;
      const toLeft = gestureState.dx > 80;

      if (toRight && pandingRef.current) {
        if (focus < 3) {
          pandingRef.current = false;
          setFocus(focus + 1);

          Animated.timing(bannerAnim, {
            toValue: (focus + 1) * -width,
            duration: 500,
            useNativeDriver: true,
          }).start(({finished}) => {
            if (finished) {
              pandingRef.current = true;
            }
          });
        }
      }

      if (toLeft && pandingRef.current) {
        if (focus > 0) {
          pandingRef.current = false;
          setFocus(prev => prev - 1);

          Animated.timing(bannerAnim, {
            toValue: (focus - 1) * -width,
            duration: 500,
            useNativeDriver: true,
          }).start(({finished}) => {
            if (finished) {
              pandingRef.current = true;
            }
          });
        }
      }
    },
  });

  function onButtonNavigation(index: number) {
    setFocus(index);

    Animated.timing(bannerAnim, {
      toValue: index * -width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        {...panRes.panHandlers}
        style={{
          flexDirection: 'row',
          position: 'absolute',
          left: 0,
          transform: [
            {
              translateX: bannerAnim,
            },
          ],
        }}>
        {[...Array(4)].map((item, index) => {
          return <Box index={index} width={width} />;
        })}
      </Animated.View>

      <View
        style={{
          height: width,
          justifyContent: 'flex-end',
          marginTop: 30,
        }}>
        <View style={{flexDirection: 'row', gap: 16}}>
          {[...Array(4)].map((item, index) => {
            return (
              <Pointer
                key={index}
                focus={focus}
                index={index}
                onButtonNavigation={onButtonNavigation}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
