import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";

/**
 * Button component
 * @param props the properties of the component
 * @constructor the constructor of the component
 * @returns {JSX.Element} the component
 */
export default function ButtonComponent(props) {

    return (
        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: props.color ? props.color : "#008080",
                borderColor: props.color ? props.color : "#008080",
            }, props.style]}
            onPress={props.onPress}>
            <Text style={[styles.text, {color: props.textColor ? props.textColor : "#fff"}]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

// Style for a responsive button that have a rounded border
const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 32,
        margin: 16,
        alignItems: "center",
    },
    text: {
        textAlign: "center",
    },
});

ButtonComponent.defaultProps = {
    text: "Button",
    onPress: () => {},
    styleButton: styles.button,
    styleText: styles.text,
};

