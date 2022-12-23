import React, {useState, useContext} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import Field from "./ui/Field";
import ButtonComponent from "./ui/ButtonComponent";
import {UsernameContext, TokenContext} from "../context/Context";
import {signIn} from "../api/crudUser";

/**
 * A component that renders a form for signing in to the app.
 */
export default function SignIn() {
    // The username state
    const [username, setUsername] = useState("");
    // The password state
    const [password, setPassword] = useState("");
    // The error state
    const [error, setError] = useState("");
    // The visibility state
    const [visible, setVisible] = useState(false);
    // The setToken function from the TokenContext
    const [, setToken] = useContext(TokenContext);
    // The setUsernameContext function from the UsernameContext
    const [, setUsernameContext] = useContext(UsernameContext);

    /**
     * Makes a request to the server to sign in with the given username and password.
     */
    const getSignIn = () => {
        setError("");

        if (username !== "" && password !== "") {
            setVisible(true);
            signIn(username, password).then(
                (token) => {
                    setToken(token);
                    setUsernameContext(username);
                }).catch(err => {
                setError(err.message);
            }).finally(() => {
                setVisible(false);
            });
        } else {
            setError("Please fill all the fields");
        }
    };

    return (
        <View style={styles.container}>
            <Field label="Username" placeholder="Username" onChangeText={(username) => setUsername(username)} value={username} />
            <Field label="Password" placeholder="Password" onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={true} />
            {visible && <ActivityIndicator size="large" color="#B02F13" animating={visible} />}
            {!visible && <ButtonComponent title="Sign in" onPress={getSignIn} />}
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
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    error: {
        color: "red",
    }
});
