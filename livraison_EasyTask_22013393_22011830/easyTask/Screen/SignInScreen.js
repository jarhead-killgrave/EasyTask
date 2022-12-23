import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import SignIn from "../components/SignIn";

/**
 * The screen that permits to sign in
 * The component is a form with a username and a password. It has a header with a title and a button to sign in
 * @constructor
 */
export default function SignInScreen(props) {
    useEffect(() => {
        props.navigation.setOptions({
            headerStyle: {
                backgroundColor: "#B02F13",
            },
            headerTintColor: "#fff",
            headerTitle: "Sign In",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        });
    }, []);
    return (
        <View style={styles.container}>
            <SignIn/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
});