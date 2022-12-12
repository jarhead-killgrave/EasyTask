import 'react-native-gesture-handler';
import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {TokenContext, UsernameContext} from "./context/Context";
import Navigation from "./navigation/Navigation";



export default function App() {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

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
