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
                <Camera />
            </View> 
        )
    }
}

export default connect(mapStateToProps, mapActionToProps)(App);
