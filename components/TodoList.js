import React, {useEffect, useState} from "react";
import {Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import todoData from "../Helpers/todoData";
import TodoItem from "./TodoItem";
import AddInput from "./form/AddInput";
import Header from "./Header";
import ButtonComponent from "./form/ButtonComponent";
/**
 * Component that displays a list of TodoItem
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoList(props) {
    // The list of todoItems
    const [todos, setTodos] = useState(todoData);

    // The text of the TextInput
    const [newTodo, setNewTodo] = useState("");
    const [count, setCount] = useState(todoData.filter(todo => todo.done).length);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Liste the options for the filter
    const filterOptions = ["all", "done", "todo"];

    // Update the count state when the todos state changes
    useEffect(() => {
        setCount(todos.filter(todo => todo.done).length);
    }, [todos]);

    // Update the filteredTodos when the filter changes or the todos change
    useEffect(() => {
        switch (filter) {
            case "done":
                setFilteredTodos(todos.filter(todo => todo.done));
                break;
            case "todo":
                setFilteredTodos(todos.filter(todo => !todo.done));
                break;
            default:
                setFilteredTodos(todos);
        }
    }, [todos, filter]);

    // Delete a todoItem from the list
    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    // Add a todoItem to the list
    const addTodo = () => {
        const newTodos = [...todos, {id: Math.max(...todos.map(todo => todo.id)) + 1, content: newTodo, done: false}];
        setTodos(newTodos);
        setNewTodo("");
    };

    // Update a todoItem in the list
    const updateTodo = (id, done) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.done = done;
            }
            return todo;
        });
        setTodos(newTodos);
    }

    //Check All
    const checkAll = (done) => {
        const newTodos = todos.map((todo) => {
            todo.done = done;
            return todo;
        });
        setTodos(newTodos);
    }


    return(
        <View style={styles.container}>
            <Header
                style={styles.header}
                nbDone={count} nbTotal={todos.length} filter={filter} setFilter={setFilter} filterOptions={filterOptions}/>

            <FlatList
                style={styles.listItem}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No todo
                    </Text>

                }
                data={filteredTodos}
                renderItem={({item}) => <TodoItem item={item}
                                                  deleteItem={(id) => deleteTodo(id)}
                                                    updateItem={
                                                        (id, done) => updateTodo(id, done)
                                                    }/>}
                keyExtractor={item => item.id.toString()}

            />
            <AddInput
                style={styles.addInput}
                text={newTodo} setText={setNewTodo} onSubmit={addTodo} checkAll={checkAll} onFocus={() => setFilter("all")}/>
            <View style={styles.buttons}>
                <ButtonComponent
                    style={styles.button}
                    title="Check All"
                    onPress={() => checkAll(true)}
                />
                <ButtonComponent
                    style={styles.button}
                    title="Uncheck All"
                    onPress={() => checkAll(false)}
                />
            </View>
        </View>

    );
}


// We will use "%" for the styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: "5%",
        padding: "5%",
        backgroundColor: "#f5f5f5"
    },
    header: {
        flex: 3,
    },
    listItem: {
        flex: 8,
        width: "100%",
    },
    addInput: {
        flex: 1,
    },
    empty: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: "auto"
    },
    buttons: {
            flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        flex: 1,
    }
});









