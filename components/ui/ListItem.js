import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import Item from "./Item";

/**
 * The list of items
 * @param props the properties of the component
 */
export default function ListItem(props = {
    data: [], deletableItem: false, checkableItem: false, clickableItem: false,
    onItemDelete: () => {}, onItemCheck: () => {}, onItemPress: () => {} }) {

    // The list of items
    const [items, setItems] = useState(props.data);

    // Update the list of items
    useEffect(() => {
        setItems(props.data);
    }, [props.data]);

    // Delete an item
    const deleteItem = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        props.onItemDelete(id);
    }

    // Check an item
    const checkItem = (id, done) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                item.done = done;
            }
            return item;
        });
        setItems(newItems);
        props.onItemCheck(id, done);
    }

    // Press an item
    const pressItem = (id) => {
        props.onItemPress(id);
    }

    return (
        <FlatList
            style={styles.list}
            data={items}
            renderItem={({item}) => <Item item={item} deletable={props.deletableItem} checkable={props.checkableItem}
                                          clickable={props.clickableItem} _onDelete={deleteItem} _onCheck={checkItem} _onPress={pressItem}/>}
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        marginTop: "5%",
        padding: "5%",
    }
});
