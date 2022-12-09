import React, {useState, useEffect} from "react";
import {StyleSheet, FlatList, Text, View} from "react-native";
import Item from "./Item";
/**
 * The list of items
 * @param props the properties of the component
 */
export default function ListItem(props = {data: [], deletableItem: false,
    checkableItem: false, onItemDelete: () => {}, onItemCheck: () => {}}) {
    const [items, setItems] = useState(props.data);

    // Update the items when the props change
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
    const checkItem = (id, checked) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                item.checked = checked;
            }
            return item;
        });
        setItems(newItems);
        props.onItemCheck(id, checked);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item}) => <Item
                                            item={item} checkable={props.checkableItem} checked={item.checked}
                                            _onCheck={checkItem} destructible={props.deletableItem} _onDelete={deleteItem}
                                        />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

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
});
