import React, {useContext, useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet, View} from "react-native";
import {callApiUpdateState} from "../api/todoAPI";
import {createTask, getTasks, markAllTask, switchTask} from "../api/crudTask";
import Header from "../components/Header";
import ListItem from "../components/ui/ListItem";
import AddInput from "../components/ui/AddInput";
import ButtonComponent from "../components/ui/ButtonComponent";
import {TokenContext} from "../context/Context";



export default function TodoListScreen(props) {
    const idList = props.route.params.id
    const [todos, setTodos] = useState([]);
    // The text of the TextInput
    const [newTodo, setNewTodo] = useState("");
    const [count, setCount] = useState(todos.filter(todo => todo.done).length);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Liste the options for the filter
    const filterOptions = ["all", "done", "todo"];

    const [token,] = useContext(TokenContext);
    const insets = useSafeAreaInsets();




    // Update the list of todoItems
    useEffect(() => {
        const updateTodos = (response) => {
            // Map the response to a new array of objects with "id" and "content" properties
           setTodos(response)
        }
        callApiUpdateState(getTasks, updateTodos, idList, token)
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
            const updateState = (response) => {
                console.log(response)
                setTodos([...todos, {id: response.id, content: response.content, done: response.done}]);
            }
            console.log("addTodo in list " + idList);
            callApiUpdateState(createTask, updateState, idList, token, newTodo).then(() => {
                setNewTodo("");
            });
        }
    };

    // Switch the value of the done property of a todoItem
    const toggleTodo = (id, done) => {
        const updateState = (response) => {
            const newTodos = todos.map((todo) => {
                if (todo.id === id) {
                    todo.done = response.done;
                }
                return todo;
            });
            setTodos(newTodos);
        }
        callApiUpdateState(switchTask, updateState, id, done, token);
    }

    //Check All
    const checkAll = (done) => {
        callApiUpdateState(markAllTask, setTodos, idList, done, token);
    }

    return (
        <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>

            <Header style={styles.header}
                    nbDone={count} nbTotal={todos.length} filter={filter} setFilter={setFilter}
                    filterOptions={filterOptions}/>

                <ListItem data={filteredTodos} deletableItem={true} deleteItem={deleteTodo} checkableItem={true}
                          onItemCheck={toggleTodo} pressableItem={false} style={styles.listItem} />

                <AddInput style={styles.addInput}
                    title={"Add"} onChange={setNewTodo} placeholder={"Add a new todo"} onSubmit={addTodo}/>


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
        width: '100%',
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",

    },
    header: {
        flex: 3,
    },
    listItem: {
        flex: 8,
    },
    addInput: {
        flex: 1,
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