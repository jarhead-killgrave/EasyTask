import React, {useState} from "react";

import {Text, View, StyleSheet} from "react-native";
import Field from "../components/form/Field";
import ButtonComponent from "../components/form/ButtonComponent";
import SignIn from "../components/SignIn";

/**
 * The screen that permits to sign in
 * The component is a form with a username and a password. It has a header with a title and a button to sign in
 * @constructor
 */
export default function SignInScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //On change the username
    const onChangeUsername = (username) => {
        setUsername(username);
    }
    const onChangePassword = (password) => {
        setPassword(password);
    }

    //Sign in function
    const signIn = () => {
        console.log("Sign in");
    }



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