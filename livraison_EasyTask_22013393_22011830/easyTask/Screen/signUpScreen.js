import React, {useEffect} from "react";

import {StyleSheet, Text, View, Button} from "react-native";

import SignUp from "../components/SignUp";

/**
 * The screen that permits to sign up
 *
 * @constructor
 */
export default function SignUpScreen(props) {
    useEffect(() => {
        props.navigation.setOptions({
            headerStyle: {
                backgroundColor: "#B02F13",
            },
            headerTintColor: "#fff",
            headerTitle: "Sign Up",
            headerTitleStyle: {
                fontWeight: "bold",
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            <SignUp/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    }
});