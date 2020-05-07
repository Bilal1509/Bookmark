/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { WheelPicker } from "react-native-wheel-picker-android";
import QuranSurahs from "./QuranSurahs.json";
import styles from "./App.Styles";

const _screenWidthHalf = Math.floor(Dimensions.get("screen").width / 2);
const _QuranSurahsNames = QuranSurahs.map((v) => v.name);
const _QuranSurahsVerseCounts = QuranSurahs.map((v) => {
  const verses = [];
  for (let i = 1, len = v.verses; i <= len; i++)
    verses.push(i + "");
  return verses;
});

const data = [[]];


/**
 * @returns {() => React$Node}
 */
const App = () => {
  const [selectedSurahNameIndex, setSelectedSurahNameIndex] = React.useState(0);
  const [selectedSurahVerseCountIndex, setSelectedSurahVerseCountIndex] = React.useState(0);

  return <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      // style={styles.scrollView}
      >
        <View style={{ marginTop: 100 }} />

        <View style={{ flex: 1, flexDirection: "row", }}>

          {/* <DropdownMenu
            style={{ flex: 1 }}
            bgColor="transparent"
            tintColor="#666666"
            activityTintColor="green"
            // arrowImg={}      
            // checkImage={}   
            // optionTextStyle={{color: '#333333'}}
            // titleStyle={{color: '#333333'}} 
            // maxHeight={300} 
            handler={(selection, row) => {
              // this.setState({ text: data[selection][row] })
            }}
            data={data}
          > */}


          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ width: _screenWidthHalf, alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>Surah</Text>
            </View>
            <View style={{ width: _screenWidthHalf, alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>Aayah</Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>

            <View style={{ width: _screenWidthHalf }}>
              <WheelPicker
                selectedItem={selectedSurahNameIndex}
                data={_QuranSurahsNames}
                onItemSelected={() => { }}
              />
            </View>
            <View style={{ width: _screenWidthHalf }}>
              <WheelPicker
                selectedItem={selectedSurahVerseCountIndex}
                data={_QuranSurahsVerseCounts[0]}
                onItemSelected={() => { }}
              />
            </View>

          </View>

          {/* </DropdownMenu> */}
        </View>

      </ScrollView>
    </SafeAreaView>
  </>;
};

export default App;
