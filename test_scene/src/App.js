import React from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
  Sphere,
} from 'react-vr';

import {
    mapStateToProps,
    mapActionToProps,
} from './utils/mapFunction';
import Camera from './containers/Camera';
// import Controller from './containers/Controller';

// const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                {/* <Controller /> */}
                <Pano source={asset('chess-world.jpg')}/>
                {/* <Sphere
                    radius={20}
                    widthSegments={20}
                    heightSegments={12}
                    style={{
                        transform: [{
                            translate: [0, 1, -2],
                        }]
                    }}
                /> */}
                {/* <Text
                    style={{
                        backgroundColor: '#770000',
                        fontSize: 0.2,
                        fontWeight: '500',
                        layoutOrigin: [0.5, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [{translate: [0, 0, 0]}],
                    }}>
                    GIGI
                </Text> */}
                <Camera />
            </View> 
        )
    }
}

export default connect(mapStateToProps, mapActionToProps)(App);
