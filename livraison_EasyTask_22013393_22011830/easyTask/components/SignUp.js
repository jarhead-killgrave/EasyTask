import React, {useContext, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {signUp} from "../api/crudUser";
import Field from "./ui/Field";
import ButtonComponent from "./ui/ButtonComponent";
import {TokenContext, UsernameContext} from "../context/Context";


/**
 * The component that permits to sign up
 */
export default function SignUp() {
    // The username state
    const [username, setUsername] = useState("");
    // The password state
    const [password, setPassword] = useState("");
    // The error state
    const [confirmPassword, setConfirmPassword] = useState("");
    // The error state
    const [error, setError] = useState("");
    // The visibility state
    const [visible, setVisible] = useState(false);
    // The setToken function
    const [, setToken] = useContext(TokenContext);
    // The setUsernameContext function
    const [, setUsernameContext] = useContext(UsernameContext);

    /**
     * testPassword checks the strength of the password. It must contain at least 8 characters,
     * one uppercase letter, one lowercase letter, and one number.
     *
     * @param {string} password - The password to be tested.
     * @returns {boolean} - A boolean representing whether the password is strong enough
     */
    const testPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return regex.test(password);
    }

    /**
     * Makes a request to the server to sign up with the given username and password.
     */
    const getSignUp = () => {
        setError("");
        if (username !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                if (testPassword(password)) {
                    setVisible(true);
                    signUp(username, password).then(
                        (token) => {
                            setToken(token);
                            setUsernameContext(username);
                        }).catch(err => {
                        setError(err.message);
                    }).finally(() => {
                        setVisible(false);
                    });
                }
                else {
                    setError("The passwords must contain at least 8 characters, one uppercase letter, one lowercase letter and one number");
                }
            } else {
                setError("The password and the confirmation password must be the same");
            }
        } else {
            setError("Please fill all the fields");
        }
    }

    return (
        <View style={styles.container}>
            <Field label="Username" placeholder="Username" onChangeText={(username) => setUsername(username)}
                   value={username}/>
            <Field label="Password" placeholder="Password" onChangeText={(password) => setPassword(password)}
                   value={password} secureTextEntry={true}/>
            <Field label="Confirm password" placeholder="Confirm password"
                   onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} value={confirmPassword}
                   secureTextEntry={true}/>
            {visible && <ActivityIndicator size="large" color="#B02F13" animating={visible}/>}
            {!visible && <ButtonComponent title="Sign up" onPress={getSignUp}/>}
            {error !== "" && <Text style={styles.error}>{error}</Text>}
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
    error: {
        color: "red",
    }
});