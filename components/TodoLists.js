import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
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
    const callApiUpdateState = async (apiCall, ...args) => {
        // Set loading state to true before calling the API function
        setIsLoading(true);

        try {
            // Call the API function with the provided arguments
            const response = await apiCall(...args);

            // Check if the response is an array and map the response to a new array of objects with "id" and "content" properties
            // Otherwise, filter the todoLists array to remove the list with the provided id in the first argument of "args"
            const newLists = Array.isArray(response) ? response.map(list => ({ id: list.id, content: list.title })) : todoLists.filter(list => list.id !== args[0]);

            // Update the todoLists state with the new list of items
            setTodoLists(newLists);
        } catch (error) {
            // Log the error message to the console and store it in the error state
            console.log(error);
            setError(error.message);
        } finally {
            // Set the loading state to false when the API call is finished
            setIsLoading(false);
        }
    }


    // Get the todoLists when the component is mounted
    useEffect(() => {
        console.log("useEffect");
        // Call the getTaskLists function with the token and username
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
            <ListItem data={todoLists} update={updateTodoList} onItemDelete={deleteTodoList} deletableItem={true} pressableItem={true} onItemPress={(id) => console.log(id)}/>
            <AddInput placeholder="New todoList" onChange={createNewTodoList} title={"Add"}/>
            {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
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