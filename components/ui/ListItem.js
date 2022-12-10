import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import Item from "./Item";

/**
 * The list of items
 * @param props the properties of the component
 */
export default function ListItem(props = {
    data: [], deletableItem: false, checkableItem: false, pressableItem: false,
    onItemDelete: () => {}, onItemCheck: () => {}, onItemPress: () => {} }) {

    // The list of items
    const [items, setItems] = useState(props.data);

    // Update the list of items
    useEffect(() => {
        setItems(props.data);
    }, [props.data]);

    // Delete an item
    const deleteItem = (id) => {
        props.onItemDelete(id);
    }

    // Check an item
    const checkItem = (id, done) => {
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
                                          pressable={props.pressableItem} _onDelete={deleteItem} _onCheck={checkItem} _onPress={pressItem}/>}
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        backgroundColor: "#f5f5f5"
    }
});
