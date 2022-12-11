import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {callApiUpdateState} from "../api/todoAPI";
import {createTask, getTasks, updateTask} from "../api/crudTask";
import Header from "../components/Header";
import ListItem from "../components/ui/ListItem";
import AddInput from "../components/ui/AddInput";
import ButtonComponent from "../components/ui/ButtonComponent";


export default function TodoListScreen(props= {todoList: {id: -1, title: ""}, navigation: {}}) {
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
        callApiUpdateState(getTasks, setTodos, props.id);
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
            callApiUpdateState(createTask, setTodos, props.id, newTodo).then(() => {
                setNewTodo("");
            } );
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
                style={styles.addInput} title={"Add a new todo"} value={newTodo} onChange={setNewTodo} onAdd={addTodo}/>
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