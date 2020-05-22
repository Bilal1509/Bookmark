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
  Button,
} from 'react-native';
import QuranSurahs from "./QuranSurahs.json";
import { GetUserBookmarkDetailsAsync, SaveUserBookmarkDetailsAsync } from "./services/saveBookmarkService";
import WheelPickerCustom from './WheelPickerCustom';

const _screenWidthHalf = Math.floor(Dimensions.get("screen").width / 2);
const _screenWidth1By3 = Math.floor(Dimensions.get("screen").width / 3);
const _QuranSurahsNames = QuranSurahs.map((v) => `${v.number} - ${v.name}`);
const _QuranSurahsVerseCounts = QuranSurahs.map((v) => {
  const verses = [];
  for (let index = 1, len = v.verses; index <= len; index++)
    verses.push(index + "");
  return verses;
});

class App extends React.Component {
  state = {
    selectedSurahNameIndex: 0,
    selectedSurahVerseCountIndex: 0,
    saveButtonDisabled: true,
  };

  componentDidMount() {
    setTimeout(async () => {
      const bookmarkDetails = await GetUserBookmarkDetailsAsync();
      this.setState({
        selectedSurahNameIndex: bookmarkDetails.SurahNumber,
        selectedSurahVerseCountIndex: bookmarkDetails.AayahNumber,
      }, this.UpdateSaveButtonState.bind(this, bookmarkDetails.SurahNumber, bookmarkDetails.AayahNumber));
    }, 1500);
  }

  OnChangeSurahOrAayah = () => {
    GetUserBookmarkDetailsAsync().then(bookmarkDetails => {
      this.UpdateSaveButtonState(bookmarkDetails.SurahNumber, bookmarkDetails.AayahNumber);
    });
  };

  UpdateSaveButtonState = (SurahNumber, AayahNumber) => {
    this.setState({
      saveButtonDisabled: SurahNumber === this.state.selectedSurahNameIndex && AayahNumber === this.state.selectedSurahVerseCountIndex
    });
  };

  OnPressSaveButton = () => {
    const { selectedSurahNameIndex, selectedSurahVerseCountIndex } = this.state;
    SaveUserBookmarkDetailsAsync(selectedSurahNameIndex, selectedSurahVerseCountIndex);
    this.UpdateSaveButtonState(selectedSurahNameIndex, selectedSurahVerseCountIndex);
  }

  render() {
    return <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ marginTop: 100 }} />

          <View style={{ flex: 1, flexDirection: "column" }}>

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
                <WheelPickerCustom
                  selectedItem={this.state.selectedSurahNameIndex}
                  data={_QuranSurahsNames}
                  onItemSelected={val => {
                    this.setState({ selectedSurahNameIndex: val }, this.OnChangeSurahOrAayah);
                  }}
                />
              </View>
              <View style={{ width: _screenWidthHalf }}>
                <WheelPickerCustom
                  selectedItem={this.state.selectedSurahVerseCountIndex}
                  data={_QuranSurahsVerseCounts[this.state.selectedSurahNameIndex]}
                  onItemSelected={val => {
                    this.setState({ selectedSurahVerseCountIndex: val }, this.OnChangeSurahOrAayah);
                  }}
                />
              </View>

            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: _screenWidth1By3 }}>
              <Button onPress={this.OnPressSaveButton} title="Save" disabled={this.state.saveButtonDisabled} />
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>;
  }
}

export default App;
