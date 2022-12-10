import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {UsernameContext, TokenContext} from "../context/Context";
import {getTaskLists, createTaskList, updateTaskList, deleteTaskList} from "../api/crudTaskList";
import ListItem from "./ui/ListItem";
import AddInput from "./ui/AddInput";

/**
 * The todoLists component
 */
export default function TodoLists() {
    const [todoLists, setTodoLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [username,] = useContext(UsernameContext);
    const [token,] = useContext(TokenContext);

    // Call to api function
    const callApiUpdateState = (apiFunction, ...args) => {
        setIsLoading(true);
        apiFunction(...args)
            .then((response) => {
                const list = response.map((item) => { return {id: item.id, content: item.title}});
                setTodoLists(list);
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Get the todoLists when the component is mounted
    useEffect(() => {
        console.log("useEffect");
        callApiUpdateState(getTaskLists, username, token);
    }, []);

    // Create a new todoList
    const createNewTodoList = (title) => {
        callApiUpdateState(createTaskList, username, token, title);
    }

    // Update a todoList
    const updateTodoList = (id, name) => {
        callApiUpdateState(updateTaskList, id, name, token);
    }

    // Delete a todoList
    const deleteTodoList = (id) => {
        callApiUpdateState(deleteTaskList, id, token);
    }

    // Display the todoLists
    return (
        <View style={styles.container}>
            <ListItem data={todoLists} update={updateTodoList} onItemDelete={deleteTodoList} deletableItem={true} />
            <AddInput placeholder="New todoList" onChange={createNewTodoList} title={"Add"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    listItem: {
        flex : 8
    },
    addInput: {
        flex: 2
    },
    error: {
        color: "#ff0000",
        flex: 1
    }
});