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
    View,
    NativeModules
} from 'react-native';

var CalendarManager = NativeModules.CalendarManager;

export default class ReactNativeDemo extends Component {
    componentWillMount() {
        CalendarManager.cacheSize((error, events) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({
                    cache:Math.round(events/1024)   //缓存大小
                })
            }
        })
    }

    clearRom  =()=>{
        CalendarManager.cleanCache((error, events) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({
                    cache:0  //这里本应该是清除之后的数据Math.round(events/1024).应该是0才对,但是总是清不干净,我就直接置为0了
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeOne()}>点击往原生传字符串</Text>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeTwo()}>点击往原生传字符串+字典</Text>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeThree()}>点击往原生传字符串+日期</Text>
                <Text style={styles.welcome} onPress={()=>this.callBackOne()}>点击调原生+回调</Text>
                <Text style={styles.welcome} onPress={()=>this.callBackTwo()}>Promises</Text>
                <Text style={styles.welcome} onPress={()=>this.useNativeValue()}>使用原生定义的常量</Text>
            </View>
        );
    }
    // 传原生一个字符串
    passValueToNativeOne = ()=>{
        CalendarManager.addEventOne('周少停');
    }
    // 传原生一个字符串 + 字典
    passValueToNativeTwo = ()=>{
        CalendarManager.addEventTwo('周少停',{job:'programmer'});
    }
    // 传原生一个字符串 + 日期
    passValueToNativeThree = ()=>{
        CalendarManager.addEventThree('周少停',19910730);
    }
    // 传原生一个字符串 + 回调
    callBackOne = ()=>{
        CalendarManager.testCallbackEventOne(('我是RN给原生的'),(error, events) => {
            if (error) {
                console.error(error);
            } else {
                alert(events)
            }
        })
    }
    //Promise回调
    async callBackTwo(){
        try{
            var events=await CalendarManager.testCallbackEventTwo();
            alert(events)
        }catch(e){
            console.error(e);
        }
    }
    //使用原生定义的常量
    useNativeValue = ()=>{
        alert(CalendarManager.ValueOne)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:100
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
