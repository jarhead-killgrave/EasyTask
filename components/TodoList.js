import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import todoData from "../Helpers/todoData";
import {getTasks, createTask, updateTask} from "../api/crudTask";
import AddInput from "./ui/AddInput";
import ListItem from "./ui/ListItem";
import Header from "./Header";
import {callApiUpdateState} from "../api/todoAPI";
import ButtonComponent from "./ui/ButtonComponent";
/**
 * Component that displays a list of TodoItem
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoList(props={id: -1, title: ""}) {
    // The list of todoItems
    const [todos, setTodos] = useState([]);
    // The text of the TextInput
    const [newTodo, setNewTodo] = useState("");
    const [count, setCount] = useState(todos.filter(todo => todo.done).length);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Liste the options for the filter
    const filterOptions = ["all", "done", "todo"];


    // Update the list of todoItems
    useEffect(() => {
        beforeAll()
        callApiUpdateState(getTasks, () => {}, () => {}, setTodos, props.id);
    }, []);

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
        if (newTodo.length > 0) {
                    try {
                        createTask(props.id, newTodo).then((response) => {
                            setTodos([...todos, response]);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    setNewTodo("");
                }
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

        try {
            updateTask(id, done).then((response) => {
                console.log(response);
            });
        } catch (e) {
            console.log(e);
        }
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

            <ListItem data={filteredTodos} _onDelete={deleteTodo} _onCheck={updateTodo}/>

            <AddInput
                style={styles.addInput} title={newTodo} onChange={setNewTodo} placeholder={"Add a new todo"} onSubmit={addTodo}/>

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









