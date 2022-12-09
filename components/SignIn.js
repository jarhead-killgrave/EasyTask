import React, {useState, useContext} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import Field from "./ui/Field";
import ButtonComponent from "./ui/ButtonComponent";
import {UsernameContext, TokenContext} from "../context/Context";
import {signIn} from "../api/todoAPI";

/**
 * The component that permits to sign in
 *
 */
export default function SignIn(){
    // The username state
    const [username, setUsername] = useState("");
    // The password state
    const [password, setPassword] = useState("");
    // The error state
    const [error, setError] = useState("");
    // The visibility state
    const [visible, setVisible] = useState(true);
    // The setToken function
    const [, setToken] = useContext(TokenContext);
    // The setUsernameContext function
    const [, setUsernameContext] = useContext(UsernameContext);

    const getSignIn = () =>{
        setError("");
        if(username !== "" && password !== ""){
            setVisible(false);
            signIn(username, password).then(
                (token) => {
                    setToken(token);
                    setUsernameContext(username);
                }).catch(err => {
                setError(err.message);
            }).finally(() => {
                setVisible(true);
            });
        }else{
            setError("Please fill all the fields");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sign In
            </Text>
            <Field label="Username" placeholder="Username" onChangeText={(username) => setUsername(username)} value={username}/>
            <Field label="Password" placeholder="Password" onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={true}/>
            <ButtonComponent style = {styles.button} title="Sign In" onPress={() => getSignIn()}/>
            <Text style={styles.error}>
                {error}
            </Text>
            <ActivityIndicator size="large" color="#0000ff" animating={!visible}/>
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
    error: {
        color: "red",
    }
});
