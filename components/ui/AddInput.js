import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, Platform} from "react-native";
import ButtonComponent from "./ButtonComponent";

/**
 * AddInput is a functional component that renders a TextInput and a ButtonComponent
 * and allows the user to enter text and submit it.
 *
 * The component also adjusts the component's styles when the TextInput is focused or blurred.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The current value of the TextInput.
 * @param {Function} props.onChange - The function to call when the value of the TextInput changes.
 * @param {string} props.placeholder - The placeholder text for the TextInput.
 * @param {string} props.title - The title of the ButtonComponent.
 */
export default function AddInput(props = {value: "", onChange: () => {}, placeholder: "", title: "Add"}) {

    // The state variable to store the focus status of the TextInput
    const [focus, setFocus] = useState(false);

    /**
     * A private method that is called when the user submits the text.
     * It calls the onChange function passed in the component's props with the entered text,
     * and resets the entered text.
     */
    const _onSubmit = () => {
        props.onChange(props.value);
    }

    return (
        // Render the KeyboardAvoidingView component with the TextInput and ButtonComponent
        <KeyboardAvoidingView style={styles.container}
                              behavior={Platform.OS === "ios" ? "padding" : ""}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
                              enabled={focus}

        >
            <TextInput style={styles.input}
                       value={props.value}
                       defaultValue=""
                       onSubmitEditing={() => _onSubmit()}
                       onFocus={() => {
                           setFocus(true);
                       }
                       }
                       multiline={true}
                       onBlur={() => setFocus(false)}
                       placeholder={props.placeholder} />
            <ButtonComponent
                title={props.title}
                onPress={() => _onSubmit()}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",

    },
    input: {
        flex: 6,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 16,
    }
});


