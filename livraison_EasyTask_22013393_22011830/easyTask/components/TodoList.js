import React, {useContext, useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {getTasks, createTask, deleteTask, switchTask, markAllTask} from "../api/crudTask";
import AddInput from "./ui/AddInput";
import Header from "./Header";
import ButtonComponent from "./ui/ButtonComponent";
import {TokenContext} from "../context/Context";
import Item from "./ui/Item";
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
    const [isLoading, setIsLoading] = useState(false);


    const [token,] = useContext(TokenContext);
    const [error, setError] = useState("");

    // Update the list of todoItems
    useEffect(() => {
        setError("");
        setIsLoading(true);
        getTasks(idList, token)
            .then(data => {
                console.log(data);
                setTodos(data);
            })
            .catch(error => {
                setError("Error while loading the tasks : " + error);
            }).finally(
            () => {
                setIsLoading(false);
            }
        )
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

    // Load the list of todoItems
    const loadTodos = () => {
        setError("");
        setIsLoading(true);
        getTasks(idList, token)
            .then(data => {
                console.log(data);
                setTodos(data);
            })
            .catch(error => {
                setError("Error while loading the tasks : " + error);
            }).finally(
            () => {
                setIsLoading(false);
            }
        )
    }

    // Delete a todoItem from the list
    const deleteTodo = (id) => {
        setError("");
        setIsLoading(true);
        deleteTask(id, token)
            .then(() => {
                const newTodos = todos.filter(todo => todo.id !== id);
                setTodos(newTodos);
            })
            .catch(error => {
                setError("Error while deleting the task : " + error);
            }).finally(
            () => {
                setIsLoading(false);
            }
        )
    };

    // Add a todoItem to the list
    const addTodo = (newTodo) => {
        setError("");
        if (newTodo.length > 0) {
            setIsLoading(true)
            createTask(idList, token, newTodo)
                .then(data => {
                    setTodos([...todos, data]);
                })
                .catch(error => {
                    setError("Error while creating the task : " + error);
                }).finally(
                () =>{
                    setIsLoading(false);
                })
        }
    };

    // Switch the value of the done property of a todoItem
    const toggleTodo = (id, done) => {
        setError("");
        setIsLoading(true);
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
                setError("Error while switching the task : " + error);
            }).finally(
            () => {
                setIsLoading(false);
            })
    }

    //Check All
    const checkAll = (done) => {
        setError("");
        setIsLoading(true);
        markAllTask(idList, done, token)
            .then(data => {
                setTodos(data);
            })
            .catch(error => {
                setError("Error while switching all the task to " + done + " : " + error);
            }).finally(
            () => {
                setIsLoading(false);
            })
    }

    return (
        <View style={[styles.container]}>

            <Header style={styles.header} title={props.title}
                    nbDone={count} nbTotal={todos.length} filter={filter} setFilter={setFilter}
                    filterOptions={filterOptions}/>

            {isLoading && <ActivityIndicator style={styles.listItem} size="large" color="#0000ff" animating={isLoading}/>}
            {!isLoading && error!=="" && <View style={styles.listItem}>
                <Text style={styles.error}>{error}</Text>
                <ButtonComponent title={"Retry"} onPress={loadTodos}/>
            </View>}
            {!isLoading && error === "" && <FlatList data={filteredTodos} renderItem={({item}) => (
                <Item item={item} deletableItem={true} onItemDelete={deleteTodo} checkableItem={true} onItemCheck={toggleTodo} checked={item.done}/>
            )} keyExtractor={item => item.id.toString()} style={styles.listItem} />
            }

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
        width: '100%',
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









