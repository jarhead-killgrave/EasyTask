import React from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";


/**
 * The component that represents the field of a form
 *
 * @param props the properties of the component
 * @constructor
 */
export default function Field(props) {
    return (
        <View>
            <Text
                style={styles.label}
            >{props.label}</Text>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
            />
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
    },

});
