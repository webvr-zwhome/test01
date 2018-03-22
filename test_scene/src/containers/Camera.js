import React from 'react';
import { PerspectiveCamera } from 'three';
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
} from 'react-vr';
import Room from './Room';
import getControllerState from '../utils/getControllerState';
import { cameraMoveWithMouse } from '../utils/cameraMove';
import { _ } from 'lodash';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class Camera extends React.Component {

    constructor() {
        super();
        this.state = {
            buttons: [],     // 手柄按键
            axes: [],        // 手柄遥感
            viewportX: 0,    // 鼠标X
            viewportY: 0,    // 鼠标Y
            move: 0,         // 前后移动标量 清零计算
            moveX: 0,        // 世界坐标camera的x轴位置
            moveZ: 0,        // 世界坐标camera的z轴位置
            rotate: 0,       // 左右旋转值 叠加计算
            isRotate: false, // 是否正在旋转
        }

        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
           
            // console.log('e', e);
            // if (e.type !== 'GamepadInputEvent'|| e.gamepad !== 0) {
            //     return;
            // }
            if (e.eventType === 'mousemove' && e.shiftKey) {

                const preX = this.state.viewportX;
                const preY = this.state.viewportY;

                const move = cameraMoveWithMouse(preX, preY, e.viewportX, e.viewportY);
                
                if(move.step !== 0) {

                    if(move.step < 0) { console.log('前进: ', move.step)}
                    if(move.step > 0) { console.log('后退: ', move.step)}
                 
                    this.setState({
                        viewportX: e.viewportX,
                        viewportY: e.viewportY,
                        move: move.step,
                        moveX: this.state.moveX - this.state.move * Math.sin(this.state.rotate),
                        moveZ: this.state.moveZ - this.state.move * Math.cos(this.state.rotate),
                    })
                }
                if(move.angle !== 0) {

                    if(move.angle > 0) { console.log('左转: ', move.angle)}
                    if(move.angle < 0) { console.log('右转: ', move.angle)}

                    this.setState({
                        viewportX: e.viewportX,
                        viewportY: e.viewportY,
                        move: 0,
                        rotate: this.state.rotate + move.angle,
                    })
                }
            }

            if (e.eventType === 'keydown') {
                const buttons = this.state.buttons.concat([]);
                buttons[e.button] = true;
                this.setState({buttons});
            } else if (e.eventType === 'keyup') {
                const buttons = this.state.buttons.concat([]);
                buttons[e.button] = false;
                this.setState({buttons});
            } else if (e.eventType === 'axismove') {

                const preAxis0 = this.state.axes[0];
                const preAxis1 = this.state.axes[1];

                const move = cameraMoveWithMouse(preAxis0, preAxis0, e.axes[0], e.axes[1]);

                if(move.step !== 0) {

                    if(move.step < 0) { console.log('前进: ', move.step)}
                    if(move.step > 0) { console.log('后退: ', move.step)}
                 
                    this.setState({
                        axes: [e.axes[0], e.axes[1]],
                        move: move.step,
                        
                        moveX: this.state.moveX - this.state.move * Math.sin(this.state.rotate),
                        moveZ: this.state.moveZ - this.state.move * Math.cos(this.state.rotate),
                    })
                }
                if(move.angle !== 0) {

                    if(move.angle > 0) { console.log('左转: ', move.angle)}
                    if(move.angle < 0) { console.log('右转: ', move.angle)}

                    this.setState({
                        axes: [e.axes[0], e.axes[1]],
                        move: 0,
                        rotate: this.state.rotate + move.angle,
                    })
                }
                // const axes = this.state.axes.concat([]);
                // axes[e.axis] = e.value;
                // this.setState({ 
                //     axes,
                //     // forward: this.state.forward +( axes[1] > 0 ? 0.05 : -0.05),
                //     // rotate: this.state.rotate + ( axes[0] > 0 ? -1 : 1),
                //     // rotate: this.state.rotate - axes[0].toFixed(3) * 0.5,
                //  });
            }
        });
    }

    render() {      
        const rotate = this.state.rotate;
        // const move = this.state.move;    //basic

        // console.log('state(rotate) ', this.state.rotate);
        // console.log('state(move): ', move);
        
        // const moveX = this.state.moveX - move * Math.sin(this.state.rotate);
        // const moveZ = this.state.moveZ - move * Math.cos(this.state.rotate);

        const moveX = this.state.moveX;
        const moveZ = this.state.moveZ;
        
        // console.log('X: ', moveX);
        // console.log('Z: ', moveZ);
        // console.log('.......................');

        // const moveX = 11 + moveZ * Math.tan(-rotate) * 0.5;
        return (
            <View
                style={{
                    position: 'relative',
                }}
            >     
                <Scene 
                        style={{
                            position: 'absolute',
                            transform: [
                                { translate: [moveX, 4, moveZ]},    //camera的位置
                                { rotateY:  rotate },            //camera的旋转

                                // { translate: [0, 4, 0]},    //camera的位置

                            ],
                        
                        }}
                    >                  
                    
                    </Scene> 
                <Room moveZ={moveZ} rotate={rotate}>
                   
                </Room>
            
            </View>
        )
    }
}