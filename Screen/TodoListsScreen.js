import React, {useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import AddInput from "../components/ui/AddInput";
import ListItem from "../components/ui/ListItem";
import TodoLists from "../components/TodoLists";


/**
 * The screen that displays the list of todoLists
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoListsScreen(props) {

    return (
        <View>
            <TodoLists />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
