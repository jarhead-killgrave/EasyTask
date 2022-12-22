import React from "react";
import {Image, TouchableOpacity} from "react-native";


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
    "list": require("../../assets/svg/fi-rr-list.svg"),
    "user": require("../../assets/svg/fi-rr-user.svg"),

}

/**
 * Icon is a React native component that displays an image icon.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.name - The name of the icon to display.
 * @param {number} props.size - The size of the icon in pixels.
 * @param {Object} props.style - The style object for the icon.
 * @param {boolean} props.pressable - Whether the icon should be pressable.
 * @param {function} props.onPress - The function to call when the icon is pressed.
 * @return {ReactElement} - The rendered icon element.
 */
export default function Icon(props) {
    /**
     * Renders the icon image element.
     * @return {ReactElement} - The rendered icon image element.
     */
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
        // Render a pressable icon or a non-pressable icon
        props.pressable
            ? <TouchableOpacity onPress={props.onPress}>{renderIcon()}</TouchableOpacity>
            : renderIcon()
    );
}
