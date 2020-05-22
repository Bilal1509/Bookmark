import React from "react";
import { WheelPicker } from "react-native-wheel-picker-android";

class WheelPickerCustom extends React.Component {
  state = {
    selectedItem: 0,
    data: [],
    selectedItemLastUpdate: 0,
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if ((new Date() - new Date(state.selectedItemLastUpdate)) > 800) {
      newState.selectedItem = props.selectedItem;
      newState.selectedItemLastUpdate = new Date().getTime();
    }
    newState.data = props.data;
    return newState;
  }

  render() {
    return <WheelPicker
      selectedItem={this.state.selectedItem}
      data={this.state.data}
      onItemSelected={val => this.props.onItemSelected(val)}
    />;
  }
}

export default WheelPickerCustom;
