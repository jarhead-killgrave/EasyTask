import React, {useState, useEffect, useContext} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {signUp} from "../api/todoAPI";
import Field from "./ui/Field";
import ButtonComponent from "./ui/ButtonComponent";
import {UsernameContext, TokenContext} from "../context/Context";

/**
 * The component that permits to sign up
 */
export default function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(true);
    const [, setToken] = useContext(TokenContext);
    const [, setUsernameContext] = useContext(UsernameContext);

    const getSignUp = () =>{
        setError("");
        if(username !== "" && password !== "" && confirmPassword !== ""){
            if(password === confirmPassword){
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
            }else{
                setError("The passwords are not the same");
            }
        }else{
            setError("Please fill all the fields");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sign Up
            </Text>
            <Field label="Username" placeholder="Username" onChangeText={(username) => setUsername(username)} value={username}/>
            <Field label="Password" placeholder="Password" onChangeText={(password) => setPassword(password)} value={password} secureTextEntry={true}/>
            <Field label="Confirm password" placeholder="Confirm password" onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} value={confirmPassword} secureTextEntry={true}/>
            <ButtonComponent style = {styles.button} title="Sign Up" onPress={() => getSignUp()}/>
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