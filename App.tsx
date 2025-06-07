/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import Hello from './src/components/hello';
import Ptb1 from './src/components/ptb1';
import Hello2 from './src/components/hello2';
import HelloProp from './src/components/helloProp';
import HelloState from './src/components/helloState';
import Dad from './src/components/nhap';
import Cha from './src/components/nhap2';
import Layout1 from './src/components/layout1';
import Layout2 from './src/components/layout2';
import Layout3 from './src/components/layout3';
import Shop from './src/components/shop';
import MtRadio from './src/components/mtRadio';
import ShopFlatlist from './src/components/shopFlatlist';
import Mang from './src/components/mang';
import Manghs from './src/components/manghs';
import ShopBanh from './src/components/hangShopbanh';
import Demo from './src/components/hangMang';
import Ktra1 from './src/components/ktra1';
import Kiemtralan1 from './src/components/hangKtra1';
import QlspSqlite from './src/components/sqlite/qlspSqlite';
import HangQlspSqlite from './src/components/hangSqlite/hangQLSP';
import AppNavigatorProduct from './src/components/sqlite/AppNavigatorProduct';
import HangAppNavigatorProduct from './src/components/hangSqlite/hangAppNavigatorProduct';
import Home from './src/components/sqlite2.tsx/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/components/sqlite2.tsx/AppNavigator';
import TabApp from './src/components/sqlite2.tsx/TabApp';

function App(): JSX.Element {

  return (
    // <NavigationContainer>
    //   <AppNavigatorProduct/>
    // </NavigationContainer>

    // <NavigationContainer>
    //   <HangAppNavigatorProduct/>
    // </NavigationContainer>

    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>

    // <View>
    //   {/* <Hello/> */}
    //   {/* <Hello2/> */}
    //   {/* <Ptb1/> */}
    //   {/* <HelloProp name="Nguyễn Phi Hùng" age={20}/> */}
    //   {/* <HelloState/> */}
    //   {/* <Dad/> */}
    //   {/* <Layout1/> */}
    //   {/* <Layout2/> */}
    //   {/* <Layout3/> */}
    //   {/* <Shop/> */}
    //   {/* <ShopFlatlist/> */}
    //   {/* <MtRadio/> */}
    //   {/* <Mang/> */}
    //   {/* <Manghs/> */}
    //   {/* <Ktra1/> */}
    //   {/* <Home/> */}

    //   {/* <QlspSqlite/> */}

    //   {/* <ShopBanh/> */}
    //   {/* <Demo/> */}
    //   {/* <Kiemtralan1/> */}
    //   {/* <HangQlspSqlite/> */}
    // </View>
  );
}

export default App;
