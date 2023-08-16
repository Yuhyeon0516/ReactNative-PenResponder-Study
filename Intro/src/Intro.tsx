import {View, Text, PanResponder} from 'react-native';
import React, {useState} from 'react';

export default function Intro() {
  const [status, setStatus] = useState({
    dx: 0, // 터치 후 움직인 거리 X
    dy: 0,

    moveX: 0, // 제일 최근에 찍힌 좌표 (절대 좌표)
    moveY: 0,

    vx: 0, // 제스쳐의 속도
    vy: 0,

    x0: 0, // 터치 시작 지점
    y0: 0,
  });

  const panRes = PanResponder.create({
    // permission mothod
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    // response method
    onPanResponderGrant: () => {},
    onPanResponderReject: () => {},
    // handler method
    onPanResponderStart: (_, gestureState) => {
      setStatus(prev => {
        return {
          ...prev,
          x0: gestureState.x0,
          y0: gestureState.y0,
        };
      });
    },
    onPanResponderMove: (_, gestureState) => {
      setStatus(prev => {
        return {
          ...gestureState,
          x0: prev.x0,
          y0: prev.y0,
        };
      });
    },
    onPanResponderEnd: () => {},
    onPanResponderRelease: () => {},
  });

  const moveXSize = Math.floor(status.moveX - status.x0);
  const moveYSize = Math.floor(status.moveY - status.y0);

  return (
    <View
      {...panRes.panHandlers}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#654654',
      }}>
      <View>
        {moveXSize > 0 ? (
          <Text style={{color: 'white'}}>
            {moveXSize}만큼 오른쪽으로 가는 중
          </Text>
        ) : (
          <Text style={{color: 'white'}}>
            {-moveXSize}만큼 왼쪽으로 가는 중
          </Text>
        )}
        {moveYSize > 0 ? (
          <Text style={{color: 'white'}}>{moveYSize}만큼 아래로 가는 중</Text>
        ) : (
          <Text style={{color: 'white'}}>{-moveYSize}만큼 위로 가는 중</Text>
        )}
      </View>
      <View style={{position: 'absolute', bottom: 70, left: 10}}>
        <Text style={{color: 'white'}}>dx: {status.dx}</Text>
        <Text style={{color: 'white'}}>dy: {status.dy}</Text>
        <Text style={{color: 'white'}}>moveX: {status.moveX}</Text>
        <Text style={{color: 'white'}}>moveY: {status.moveY}</Text>
        <Text style={{color: 'white'}}>vx: {status.vx}</Text>
        <Text style={{color: 'white'}}>vy: {status.vy}</Text>
        <Text style={{color: 'white'}}>x0: {status.x0}</Text>
        <Text style={{color: 'white'}}>y0: {status.y0}</Text>
      </View>
    </View>
  );
}
