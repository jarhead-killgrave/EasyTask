import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";


/**
 * ButtonComponent is a React native component that represents a button.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.title - The label for the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {string} [props.color] - The background color of the button.
 * @param {Object} [props.style] - The style object for the button.
 * @param {string} [props.textColor] - The color of the button label.
 * @return {ReactElement} - The rendered button element.
 */
export default function ButtonComponent(props) {
    return (
        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: props.color ? props.color : "#B02F13",
                borderColor: props.color ? props.color : "#B02F13",
            }, props.style]}
            onPress={props.onPress}
        >
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
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        textAlign: "center",
    },
});

ButtonComponent.defaultProps = {
    text: "Button",
    onPress: () => {
    },
    styleButton: styles.button,
    styleText: styles.text,
};

