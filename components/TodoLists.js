import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator, Modal, FlatList} from "react-native";
import {UsernameContext, TokenContext} from "../context/Context";
import {getTaskLists, createTaskList, updateTaskList, deleteTaskList} from "../api/crudTaskList";
import AddInput from "./ui/AddInput";
import Icon from "./ui/Icon";
import TodoList from "./TodoList";
import Item from "./ui/Item";

/**
 * The todoLists component
 */
export default function TodoLists() {
    const [todoLists, setTodoLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [username,] = useContext(UsernameContext);
    const [token,] = useContext(TokenContext);
    const [showList, setShowList] = useState(false);
    const [listId, setListId] = useState(null);
    const [listName, setListName] = useState(null);




    // Get the todoLists when the component is mounted
    useEffect(() => {
        // Call the getTaskLists function with the token and username
        setIsLoading(true);
        getTaskLists(username, token).then(data => {
            const newTodoLists = data.map(todoList => ({id : todoList.id, content : todoList.title}));
            setTodoLists(newTodoLists);
        }).then(() => {
            setIsLoading(false);
        })
    }, []);

    // Create a new todoList
    const createNewTodoList = (newTodoList) => {
        // Call the createTaskList function with the token, username and the content of the new todoList
        setIsLoading(true);
        createTaskList(newTodoList, username, token).then(data => {
            // Add the new todoList to the list of todoLists
            setTodoLists([...todoLists, {id : data.id, content : data.title}]);
        }).then(() => {
            setIsLoading(false);
        })
    }

    // Update a todoList
    const updateTodoList = (id, name) => {
        // Call the updateTaskList function with the token, username, the id of the todoList and the new content
        updateTaskList(username, token, id, name).then(data => {
            // Update the todoList in the list of todoLists
            setTodoLists(todoLists.map(todoList => {
                if (todoList.id === id) {
                    return {id : data.id, content : data.title};
                }
                return todoList;
            }));
        })
    }

    // Delete a todoList
    const deleteTodoList = (id) => {
        // Call the deleteTaskList function with the token, username and the id of the todoList
        setIsLoading(true);
        deleteTaskList(id, token).then(data => {
            // Delete the todoList from the list of todoLists
            setTodoLists(todoLists.filter(todoList => todoList.id !== id));
        }).then(() => {
            setIsLoading(false);
        })
    }

    // On press function for the list items
    const onPress = (id, title) => {
        // Navigate to the todoList screen with the id and content of the list
        //props.navigation.navigate("TodoListScreen", {id, title});
        setShowList(true);
        setListId(id);
        setListName(title);

    }

    // If the modal is visible, display the todoList screen in the modal and pass the id and content of the todoList
    return (
        <View style={styles.container}>
            <Modal visible={showList} animationType="slide" onRequestClose={() => setShowList(false)}>
                <View style={styles.modalHeader}>
                    <Icon name="arrow-left" size={30} onPress={() => setShowList(false)} pressable={true}/>
                    <Text style={styles.modalHeaderText}>To-Do List</Text>
                </View>
                <TodoList id={listId} title={listName} />
            </Modal>
            {isLoading ? <ActivityIndicator style={styles.indicator} size="large" color="#0000ff"/> : (
                <FlatList style={styles.list} data={todoLists}
                          renderItem={({item}) => <Item item={item} update={updateTodoList} onItemDelete={deleteTodoList} deletableItem={true} pressableItem={true} onItemPress={onPress}/>}
                            keyExtractor={item => item.id.toString()}
                />
            )}
            <AddInput placeholder="New todoList" onSubmit={createNewTodoList} title={"Add"}/>
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
    list: {
        width: '100%',
        marginBottom: 20
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
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#B02F13",
        padding: 10,
        width: "100%"
    },
    modalHeaderText: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 10
    },
    indicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});