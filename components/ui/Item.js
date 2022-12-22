import React, {useEffect, useState} from "react";
import {Dimensions, PixelRatio, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import Icon from "./Icon";


/**
 * Item is a React native component that represents a list item.
 * @param {Object} props - The properties for the component.
 * @param {Object} props.item - The item object.
 * @param {string} props.item.content - The content of the item.
 * @param {string} props.item.id - The ID of the item.
 * @param {boolean} [props.checkableItem] - Whether the item should be checkable.
 * @param {boolean} [props.checked] - Whether the item is checked.
 * @param {function} props.onItemCheck - The function to call when the item is checked.
 * @param {boolean} [props.deletableItem] - Whether the item should be deletable.
 * @param {function} props.onItemDelete - The function to call when the item is deleted.
 * @param {boolean} [props.pressableItem] - Whether the item should be pressable.
 * @param {function} props.onItemPress - The function to call when the item is pressed.
 * @param {Object} [props.style] - The style object for the item.
 */
export default function Item(props) {

    // Store the checked state
    const [checked, setChecked] = useState(props.checked);

    // Update the checked state when the props change
    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);

    /**
     * Render a non-pressable item.
     * @return {ReactElement} - The rendered item.
     */
    const render = () => {
        return (
            <View style={[styles.item, {backgroundColor: checked ? "#e6e6e6" : "#ffffff"}, props.style]}>
                {
                    props.checkableItem &&
                    <Switch value={checked} onValueChange={(value) => props.onItemCheck(props.item.id, value)}
                            thumbColor={checked ? "#00b894" : "#d63031"}
                            trackColor={{false: "#d63031", true: "#00b894"}} ios_backgroundColor="#3e3e3e"/>
                }

                <Text style={[styles.text, checked && styles.checkedText]}>{props.item.content}</Text>

                {
                    props.deletableItem &&
                    <Icon name="trash" style={styles.icon} onPress={() => props.onItemDelete(props.item.id)}
                          pressable={true}/>
                }
            </View>
        );
    }

    // Return the item
    return (
        // Render a pressable item or a non-pressable item
        props.pressableItem ? <TouchableOpacity
            onPress={() => props.onItemPress(props.item.id, props.item.content)}>{render()}</TouchableOpacity> : render()
    );
}

Item.defaultProps = {
    checkableItem: false,
    checked: false,
    deletableItem: false,
    pressableItem: false,
}

const {width,} = Dimensions.get('window');

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: width * 0.02,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderRadius: 5,
        borderColor: "#ccc",
        marginBottom: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: "black",
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: "white"
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 18, // scale the font size based on the pixel density of the screen
    },
    icon: {
        width: PixelRatio.getFontScale() * 20, // scale the icon size based on the pixel density of the screen
        height: PixelRatio.getFontScale() * 20, // scale the icon size based on the pixel density of the screen
    },
    checkedText: {
        textDecorationLine: "line-through",
        color: "#d63031"
    }
});