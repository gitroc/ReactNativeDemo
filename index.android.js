/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    NativeModules,
    DeviceEventEmitter,
    View
} from 'react-native';

export default class ReactNativeDemo extends Component {
    componentWillMount() {
        DeviceEventEmitter.addListener('AndroidToRNMessage', this.handleAndroidMessage);
    }

    componentWillunMount() {
        DeviceEventEmitter.remove('AndroidToRNMessage', this.handleAndroidMessage);
    }

    handleAndroidMessage = (msg) => {
        //RN端获得native端传递的数据
        console.log(msg);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.CallAndroid}>与原生交互</Text>

                <Text style={styles.welcome} onPress={this.CallAndroid_callback}>调用原生方法_使用_回调函数</Text>

                <Text style={styles.welcome} onPress={this.CallAndroid_promise}>调用原生方法_使用_Promise</Text>
            </View>
        );
    }

    CallAndroid = () => {
        NativeModules.ReactNativeDemoModule.rnCallNative('React Native调用原生模块的方法成功');
    }

    CallAndroid_callback = () => {
        NativeModules.ReactNativeDemoModule.measureLayout(
            (msg) => {
                console.log(msg);
            },
            (x, y, width, height) => {
                console.log(x + '坐标,' + y + '坐标,' + width + '宽,' + height + '高');
            }
        );
    }

    CallAndroid_promise = () => {
        NativeModules.ReactNativeDemoModule.rnCallNative_promise('React Native promise调用原生模块的方法成功').then(
            (msg) => {
                console.log('promise成功：' + msg);
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
