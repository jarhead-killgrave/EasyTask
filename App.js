import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {TokenContext, UsernameContext, TodoListsContext} from "./context/Context";
import Navigation from "./navigation/Navigation";



export default function App() {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [todoLists, setTodoLists] = useState([]);

    console.log("token value ",token);
    console.log("username value ",username);
    console.log("todoLists value ",todoLists);

  return (
    <TodoListsContext.Provider value={[todoLists, setTodoLists]}>
        <UsernameContext.Provider value={[username, setUsername]}>
            <TokenContext.Provider value={[token, setToken]}>
                <Navigation/>
                <StatusBar style="auto" />
            </TokenContext.Provider>
        </UsernameContext.Provider>
    </TodoListsContext.Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
    },
});
