import 'react-native-gesture-handler';
import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {TokenContext, UsernameContext, TodoListsContext} from "./context/Context";
import Navigation from "./navigation/Navigation";



export default function App() {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    console.log("token value ",token);
    console.log("username value ",username);

  return (
        <UsernameContext.Provider value={[username, setUsername]}>
            <TokenContext.Provider value={[token, setToken]}>
                <Navigation/>
                <StatusBar style="auto" />
            </TokenContext.Provider>
        </UsernameContext.Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
    },
});
