package com.reactnativedemo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by roc on 2017/8/22.
 */

public class ReactNativeDemoPackage implements ReactPackage {
    public ReactNativeDemoModule reactNativeDemoModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        reactNativeDemoModule = new ReactNativeDemoModule(reactContext);
        modules.add(reactNativeDemoModule);
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
