import { StyleSheet, TouchableOpacity as RNTouchableOpacity, Text as RNText, View } from "react-native";

const baseStyles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'System',
    color: '#000000',
  },
  view: {
    flexDirection: 'column',
  }
});

export const TouchableOpacity = RNTouchableOpacity;
export const Text = RNText;
export const StyledView = View;
