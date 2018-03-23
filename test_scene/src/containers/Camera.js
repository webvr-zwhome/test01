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
import { cameraMove } from '../utils/cameraMove';
import { _ } from 'lodash';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class Camera extends React.Component {

    constructor() {
        super();
        this.state = {
            buttons: [],     // 手柄按键
            axes: [],        // 手柄遥杆
            viewportX: 0,    // 鼠标X
            viewportY: 0,    // 鼠标Y
            move: 0,         // 前后移动偏移量 清零计算
            moveX: 0,        // 世界坐标camera的x轴位置
            moveZ: 0,        // 世界坐标camera的z轴位置
            rotate: 0,       // 左右旋转值 叠加计算
        }

        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
           
            // console.log('e', e);
            // 【mouse + shift】控制漫游
            if (e.eventType === 'mousemove' && e.shiftKey) {

                const preX = this.state.viewportX;
                const preY = this.state.viewportY;

                const move = cameraMove(preX, preY, e.viewportX, e.viewportY);
                
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
            // -------示例代码 勿删---------
            // if (e.eventType === 'keydown') {
            //     const buttons = this.state.buttons.concat([]);
            //     buttons[e.button] = true;
            //     this.setState({buttons});
            // } else if (e.eventType === 'keyup') {
            //     const buttons = this.state.buttons.concat([]);
            //     buttons[e.button] = false;
            //     this.setState({buttons});
            // } 

            // 左手柄摇杆控制漫游
            if (e.gamepad === 0 && e.eventType === 'axismove') {

                const preAxis0 = this.state.axes[0];   // 0-横向摇杆控制左右旋转
                const preAxis1 = this.state.axes[1];   // 1-纵向摇杆控制前后移动

                const axes = []; //当前摇杆的值得数组
                if (e.axis === 0) {
                    axes[0] = e.value;  //先获得摇杆横向的值
                } else if (axes[0] && e.axis === 1) {
                    axes[1] = e.value;
                    const move = cameraMoveWithMouse(preAxis0, preAxis0, axes[0], axes[1]);
                    if(move.step !== 0) {

                        if(move.step < 0) { console.log('前进: ', move.step)}
                        if(move.step > 0) { console.log('后退: ', move.step)}
                     
                        this.setState({
                            axes: [axes[0], axes[1]],
                            move: move.step,   
                            moveX: this.state.moveX - this.state.move * Math.sin(this.state.rotate),
                            moveZ: this.state.moveZ - this.state.move * Math.cos(this.state.rotate),
                        })
                    }
                    if(move.angle !== 0) {
    
                        if(move.angle > 0) { console.log('左转: ', move.angle)}
                        if(move.angle < 0) { console.log('右转: ', move.angle)}
    
                        this.setState({
                            axes: [axes[0], axes[1]],
                            move: 0,
                            rotate: this.state.rotate + move.angle,
                        })
                    }
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
        const CAMERA_HEIGHT = 4;

        // console.log('state(rotate) ', this.state.rotate);
        // console.log('state(move): ', move);
        
        // const moveX = this.state.moveX - move * Math.sin(this.state.rotate);
        // const moveZ = this.state.moveZ - move * Math.cos(this.state.rotate);

        const moveX = this.state.moveX;
        const moveZ = this.state.moveZ;
        
        // console.log('X: ', moveX);
        // console.log('Z: ', moveZ);
        // console.log('.......................');
        return (
            <View>     
                <Scene 
                        style={{
                            transform: [
                                { translate: [moveX, CAMERA_HEIGHT, moveZ]},    //camera的位置
                                { rotateY:  rotate },                           //camera的旋转
                            ],
                        }}
                    >                     
                </Scene> 
                <Room />   
                  
            </View>
        )
    }
}