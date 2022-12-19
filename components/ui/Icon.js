import React  from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";


// The name of each icon and the path to the image
const icons = {
    "trash": require("../../assets/svg/fi-rr-trash.svg"),
    "share": require("../../assets/svg/fi-rr-share.svg"),
    "home": require("../../assets/svg/fi-rr-home.svg"),
    "plus": require("../../assets/svg/fi-rr-plus.svg"),
    "check": require("../../assets/svg/fi-rr-check.svg"),
    "cross": require("../../assets/svg/fi-rr-cross.svg"),
    "edit": require("../../assets/svg/fi-rr-edit.svg"),
    "arrow-left": require("../../assets/svg/fi-rr-arrow-left.svg"),
    "arrow-right": require("../../assets/svg/fi-rr-arrow-right.svg"),
    "arrow-up": require("../../assets/svg/fi-rr-arrow-up.svg"),
    "list" : require("../../assets/svg/fi-rr-list.svg"),
    "user" : require("../../assets/svg/fi-rr-user.svg"),

}

/**
 * A component that displays an icon
 *
 * @param props the properties of the component
 * @param {string} props.name the name of the icon
 * @param {function} props.onPress the function to call when the icon is pressed
 * @param {number} props.size the size of the icon
 * @param {boolean} props.pressable true if the icon is pressable, false otherwise
 * @param {StyleSheet} props.style the style of the icon
 */
export default function Icon(props = {name: "", onItemPress: () => {}, size: 30, pressableIcon: false, style: {}}) {

    const renderIcon = () => {
        return (
            <Image
                source={icons[props.name]}
                style={{width: props.size, height: props.size, ...props.style}}
            />
        );
    }

    // Return the icon
    return (
        // Render a pressable icon or a non-pressable icon(render is a promise)
        props.pressable ? <TouchableOpacity onPress={props.onPress}>{renderIcon()}</TouchableOpacity> : renderIcon()
    );
}
