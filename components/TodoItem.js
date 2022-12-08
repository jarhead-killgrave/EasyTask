import React, {useState, useEffect} from "react";
import {Image, StyleSheet, Switch, Text, TouchableOpacity, View, Dimensions} from "react-native";

/**
 * TodoItem component is a simple component that displays a todoItem object with a Switch, a Text
 * and a Button to delete the item
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);

    // Update the done state when the done property of the item changes
    useEffect(() => {
        props.updateItem(props.item.id, done);
    }, [done]);

    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);



    return (
        <View style={styles.container}>
            <Switch
                trackColor={{false: "#767577", true: "#81b0ff"}}
                thumbColor={done ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setDone(!done)}
                value={done}
                style={styles.switch}
            />
            <Text
                style={done ? styles.done : styles.todo}
            >{props.item.content}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.deleteItem(props.item.id)}
            >
                <Image
                    style={styles.image}
                    source={require('../assets/trash.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: '2%',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        marginBottom: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: "black",
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: "white"

    },
    switch: {
        transform: [{scaleX: 0.8}, {scaleY: 0.8}]
    },
    done: {
        textDecorationLine: "line-through",
        color: "#ccc"
    },
    todo: {
        color: "#000"
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 20,
        height: 20
    }
});

