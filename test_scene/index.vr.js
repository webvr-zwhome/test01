import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
} from 'react-vr';

export default class test_scene extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        {/* <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text> */}
        <Model
          source={{
            mtl: asset('room/room.mtl'),
            obj: asset('room/room.obj'),
          }}
          style={{
            transform: [{
              translate: [0, -5, 0]
            }],
          }}
        >
        </Model>
      </View>
    );
  }
};

AppRegistry.registerComponent('test_scene', () => test_scene);
