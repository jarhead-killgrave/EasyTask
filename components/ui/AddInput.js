import {KeyboardAvoidingView, Platform, StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';
import ButtonComponent from "./ButtonComponent";


/**
 * AddInput is a React native component that represents an input field with a submit button.
 * @param {Object} props - The properties for the component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.title - The label for the submit button.
 * @param {function} props.onSubmit - The function to call when the user submits the input.
 * @return {ReactElement} - The rendered input element.
 */
export default function AddInput(props) {
    // The state variable to store the focus status of the TextInput
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");

    // The function to call when the user submits the TextInput
    const onSubmit = () => {
        props.onSubmit(value);
        setValue("");
    }

    // Return the input field
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : ""}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20} enabled={focus}>
            <TextInput
                style={styles.input}
                value={value}
                onSubmitEditing={onSubmit}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={setValue}
                multiline={true}
                placeholder={props.placeholder}
            />
            <ButtonComponent style={styles.button} title={props.title} onPress={onSubmit}/>
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
    },
    button: {
        flex: 1,
        marginLeft: 10,
    },

    // Media query
    "@media (max-width: 600px)": {
        container: {
            flexDirection: "column",
        },
        input: {
            flex: 1,
            marginBottom: 16,
        },
    },
    "@media (min-width: 600px) and (max-width: 800px)": {
        container: {
            flexDirection: "column",
        },
        input: {
            flex: 1,
            marginBottom: 16,
        },
    },
    "@media (min-width: 800px)": {
        container: {
            flexDirection: "row",
        },
        input: {
            flex: 6,
            marginBottom: 0,
        },
    }
});


