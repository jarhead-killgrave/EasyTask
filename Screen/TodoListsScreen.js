import React, {useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import AddInput from "../components/ui/AddInput";
import ListItem from "../components/ui/ListItem";


/**
 * The screen that displays the list of todoLists
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoListsScreen(props) {
    const [todoLists, setTodoLists] = useState([]);
    const [newTodoList, setNewTodoList] = useState("");

    // Add a todoList to the list
    const addTodoList = () => {
        const newTodoLists = [...todoLists, {id: Math.max(...todoLists.map(todoList => todoList.id)) + 1, content: newTodoList}];
        setTodoLists(newTodoLists);
        setNewTodoList("");
    }


    return (
        <View style={styles.container}>
            <ListItem data={todoLists}/>
            <AddInput text={newTodoList} setText={setNewTodoList} onSubmit={addTodoList} onFocus={() => { }}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
