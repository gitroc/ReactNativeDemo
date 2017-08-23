package com.reactnativedemo;

import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

/**
 * Created by roc on 2017/8/22.
 */

public class ReactNativeDemoModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;

    public ReactNativeDemoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        //一定要有这个名字的 在rn代码里面是需要这个名字来调用该类的方法的
        return "ReactNativeDemoModule";
    }

    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送消息给rn那边

    //有一个错误

    @ReactMethod
    public void rnCallNative(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();

        Intent intent = new Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);
        Bundle bundle = new Bundle();
        mContext.startActivityForResult(intent, 200, bundle);
    }

    public void sendMsgToRn(String msg) {
        //将消息msg发送给RN侧
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", msg);
    }

    @ReactMethod
    public void measureLayout(Callback errorCallback,
                              Callback successCallback) {
        try {
            successCallback.invoke(100, 100, 200, 200);//调用回调函数，返回结果
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void rnCallNative_promise(String msg, Promise promise) {

        try {
            //业务逻辑处理
            Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
            String componentName = getCurrentActivity().getComponentName().toString();
            promise.resolve(componentName);
        } catch (Exception e) {
            promise.reject("100", e.getMessage());//promise 失败
        }
    }
}
