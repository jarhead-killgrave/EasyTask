import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {UsernameContext} from "../context/Context";
import {getTaskLists} from "../api/crudTaskList";
import ListItem from "./ui/ListItem";

/**
 * The todoLists component
 */
export default function TodoLists() {
    const [todoLists, setTodoLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the todoLists of the connected user
    useEffect(() => {
        getTaskLists().then((response) => {
            setTodoLists(response);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        }
        );
    }, []);

    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
                error ? <Text>{error.message}</Text> : (
                    <ListItem data={todoLists}/>
                )
            )}
        </View>
    );
}
