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
 * @param {Object} bookmarkDetails 
 */
export async function SaveUserBookmarkDetailsAsync(bookmarkDetails) {
  await AsyncStorage.setItem("BookmarkDetails", JSON.stringify(bookmarkDetails));
}