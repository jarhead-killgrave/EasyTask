import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";


/**
 * Field is a React native component that represents an input field.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.label - The label for the field.
 * @param {string} props.placeholder - The placeholder text for the field.
 * @param {function} props.onChangeText - The function to call when the text in the field changes.
 * @param {string} props.value - The current value of the field.
 * @param {boolean} props.secureTextEntry - Whether the field should obscure the entered text.
 * @return {ReactElement} - The rendered field element.
 */
export default function Field(props) {
    return (
        <View>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <TextInput style={styles.input} placeholder={props.placeholder} onChangeText={props.onChangeText}
                       value={props.value} secureTextEntry={props.secureTextEntry}/>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },

});
