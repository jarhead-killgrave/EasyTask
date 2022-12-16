import React, {useContext, useEffect, useState} from "react";
import {Modal, StyleSheet, Text, View} from "react-native";
import todoData from "../Helpers/todoData";
import {getTasks, createTask, updateTask, deleteTask, switchTask, markAllTask} from "../api/crudTask";
import AddInput from "./ui/AddInput";
import ListItem from "./ui/ListItem";
import Header from "./Header";
import ButtonComponent from "./ui/ButtonComponent";
import {FeedbackContext, TokenContext} from "../context/Context";
/**
 * Component that displays a list of TodoItem
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoList(props={id: -1, title: ""}) {
    const idList = props.id;

    const [todos, setTodos] = useState([]);
    // The text of the TextInput
    const [count, setCount] = useState(todos.filter(todo => todo.done).length);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Liste the options for the filter
    const filterOptions = ["all", "done", "todo"];


    const [token,] = useContext(TokenContext);
    const [feedBack, setFeedBack] = useState({type: "none", message: ""});

    // Update the list of todoItems
    useEffect(() => {
        getTasks(idList, token)
            .then(data => {
                setTodos(data);
            })
            .catch(error => {
                setFeedBack({type: "error", message: "Error while loading the tasks from the server \n" + error.message});
            });

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
        deleteTask(id, token)
            .then(data => {
                const newTodos = todos.filter(todo => todo.id !== id);
                setTodos(newTodos);
            })
            .catch(error => {
                setFeedBack({type: "error", message: "Error while deleting the task from the server \n" + error.message});
            });
    };

    // Add a todoItem to the list
    const addTodo = (newTodo) => {
        if (newTodo.length > 0) {
            createTask(idList, token, newTodo)
                .then(data => {
                    setTodos([...todos, data]);
                })
                .catch(error => {
                    setFeedBack({type: "error", message: "Error while creating a task on the server \n" + error.message});
                    console.log(error);
                });
        }
    };

    // Switch the value of the done property of a todoItem
    const toggleTodo = (id, done) => {
        switchTask(id, done, token)
            .then(data => {
                const newTodos = todos.map((todo) => {
                    if (todo.id === id) {
                        return data;
                    } else {
                        return todo;
                    }
                });
                setTodos(newTodos);
            })
            .catch(error => {
                setFeedBack({type: "error", message: "Error while updating a task on the server \n" + error.message});
            });
    }

    //Check All
    const checkAll = (done) => {
        markAllTask(idList, done, token)
            .then(data => {
                setTodos(data);
            })
            .catch(error => {
                setFeedBack({type: "error", message: "Error while updating all tasks on the server \n" + error.message});
            });
    }

    return (
        <View style={[styles.container]}>
            <Modal style={styles.modal} visible={feedBack.type === "error"}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{feedBack.message}</Text>
                    <ButtonComponent
                        title="Close"
                        onPress={() => setFeedBack({type: "none", message: ""})}
                    />
                </View>
            </Modal>

            <Header style={styles.header} title={props.title}
                    nbDone={count} nbTotal={todos.length} filter={filter} setFilter={setFilter}
                    filterOptions={filterOptions}/>

            <ListItem data={filteredTodos} deletableItem={true} onItemDelete={deleteTodo} checkableItem={true}
                      onItemCheck={toggleTodo} pressableItem={false} style={styles.listItem} />

            <AddInput style={styles.addInput}
                      title={"Add"}  placeholder={"Add a new todo"} onSubmit={addTodo}/>


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
        padding: 10,

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
    },
    headerButton: {
        marginRight: 10,
    },
    headerIcon: {
        width: 30,
        height: 30,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});









