import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";

/**
 * The todoLists component
 */
export default function TodoLists() {
    const [todoLists, setTodoLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get the todoLists of the connected user
    useEffect(() => {
        fetch("http://localhost:8080/todoLists", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTodoLists(data);
                setIsLoading(false);
            }
            )
            .catch((error) => {
                console.error("Error:", error);
            }
            );
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                todoLists.map((todoList) => (
                    <Text key={todoList.id}>{todoList.content}</Text>
                ))
            )}
        </View>
    );


}
