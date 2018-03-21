import React from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
} from 'react-vr';

import {
    mapStateToProps,
    mapActionToProps,
} from './utils/mapFunction'

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     cameraPos: [0, 0, 0],
        // }
        // this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    // handleKeyDown(e) {
    //     // switch(e.target.keycode)
    // }

    render() {
        const cameraPosition = this.props.cameraPosition;
        return (
                <View>
                {/* <Pano source={asset('chess-world.jpg')}/> */}
                <Model
                source={{
                    mtl: asset('room/room.mtl'),
                    obj: asset('room/room.obj'),
                }}
                style={{
                    transform: [{
                        translate: [0, -5, 0],
                        }],
                }}
                >
                </Model>
                <Scene 
                    style={{
                        transform: [{
                            translate: cameraPosition,
                        }]
                    }}
                />
            </View> 
        )
    }
}

export default connect(mapStateToProps, mapActionToProps)(App);





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