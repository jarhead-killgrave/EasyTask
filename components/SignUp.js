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
    const [visible, setVisible] = useState(true);
    // The setToken function
    const [, setToken] = useContext(TokenContext);
    // The setUsernameContext function
    const [, setUsernameContext] = useContext(UsernameContext);

    // Test the password strength
    const testPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return regex.test(password);
    }

    const getSignUp = () => {
        setError("");
        if (username !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                if (testPassword(password)) {
                    setVisible(false);
                    signUp(username, password).then(
                        (token) => {
                            setToken(token);
                            setUsernameContext(username);
                        }).catch(err => {
                        console.log(err);
                        setError(err.message);
                    }).finally(() => {
                        setVisible(true);
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
            <ButtonComponent style={styles.button} title="Sign Up" onPress={() => getSignUp()}/>
            {error !== "" && <Text style={styles.error}> {error} </Text>}
            <ActivityIndicator size="large" color="#0000ff" animating={!visible}/>
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