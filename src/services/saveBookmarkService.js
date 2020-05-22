import AsyncStorage from "@react-native-community/async-storage";
import BookmarkDetailsModel from "../models/BookmarkDetailsModel";

/**
 * @returns {Promise<BookmarkDetailsModel>}
 */
export async function GetUserBookmarkDetailsAsync() {
  const bookmarkDetailsString = await AsyncStorage.getItem("BookmarkDetails");
  if (bookmarkDetailsString) {
    return JSON.parse(bookmarkDetailsString);
  }
  return BookmarkDetailsModel;
}

/**
 * @param {Number} selectedSurahNameIndex
 * @param {Number} selectedSurahVerseCountIndex
 */
export async function SaveUserBookmarkDetailsAsync(selectedSurahNameIndex, selectedSurahVerseCountIndex) {
  const bookmarkDetails = BookmarkDetailsModel;
  bookmarkDetails.SurahNumber = selectedSurahNameIndex;
  bookmarkDetails.AayahNumber = selectedSurahVerseCountIndex;
  await AsyncStorage.setItem("BookmarkDetails", JSON.stringify(bookmarkDetails));
}
