import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView, Platform} from "react-native";
import ButtonComponent from "./ButtonComponent";

/**
 * Component that displays a TextInput and a Button
 * @param props the properties of the component
 * @constructor the constructor of the component
 * @returns {JSX.Element} the component
 */
export default function AddInput(props) {

    const [newText, setNewText] = useState("");
    const [focus, setFocus] = useState(false);

    // Update the newText state when the text property of the component changes
    useEffect(() => {
        setNewText(props.text);
    }, [props.text]);

    // Update the text property of the component when the newText state changes
    useEffect(() => {
        props.setText(newText);
    }, [newText]);

    //On submit, call the onSubmit function of the component
    const onSubmit = () => {
        // Add carriage return if the text is too long
        console.log(newText.length);
        if (newText.length > 30) {
            const text = newText.replace(/(.{30})/g, "$1" + " ");
            setNewText(text);
        }
        props.onSubmit();
        setNewText("");
    }

    return (
        <KeyboardAvoidingView style={styles.container}
                              behavior={Platform.OS === "ios" ? "padding" : ""}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
                              enabled={focus}

        >
            <TextInput style={styles.input}
                       value={newText}
                       onSubmitEditing={() => onSubmit()}
                       onChangeText={(text) => setNewText(text)}
                       onFocus={() => {
                           props.onFocus();
                           // Update the style of the component
                           setFocus(true);
                       }
                       }
                       multiline={true}
                       onBlur={() => setFocus(false)}
                       placeholder="Enter a new element"/>
            <ButtonComponent
                title="Add"
                onPress={() => onSubmit()}
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


