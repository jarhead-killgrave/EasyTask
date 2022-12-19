import React, {useEffect, useMemo, useState} from "react";
import {Text, View, StyleSheet, Switch, TouchableOpacity, Dimensions, PixelRatio} from "react-native";
import Icon from "./Icon";


/**
 * A functional component that renders an item in a list.
 *
 * @param {Object} props - The properties of the item
 * @param {Object} props.item - The item to be rendered
 * @param {number|string} props.item.id - The id of the item
 * @param {string} props.item.content - The content of the item
 * @param {boolean} props.checkableItem - Whether the item should be checkable
 * @param {boolean} props.checked - The initial checked state of the item
 * @param {Function} props.onItemCheck - A callback function that is called when the item is checked/unchecked
 * @param {boolean} props.deletableItem - Whether the item should be deletable
 * @param {Function} props.onItemDelete - A callback function that is called when the item is deleted
 * @param {boolean} props.pressableItem - Whether the item should be pressable
 * @param {Function} props.onItemPress - A callback function that is called when the item is pressed
 * @param {StyleSheet.NamedStyles} props.style - The style of the item
 * @returns {React.ReactElement} - The rendered item
 */
export default function Item(props) {

    // Store the checked state of the item
    const [checked, setChecked] = useState(props.checked);

    // Update the checked state of the item when the props.checked value changes
    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);


    // Helper function to render the item
    const render = () => {
        return (
            <View style={[styles.item, {backgroundColor: checked ? "#e6e6e6" : "#ffffff"}, props.style]}>
                {
                    props.checkableItem && <Switch value={checked} onValueChange={(value) => props.onItemCheck(props.item.id, value)}
                        thumbColor={checked ? "#00b894" : "#d63031"}
                                                trackColor={{false: "#d63031", true: "#00b894"}} ios_backgroundColor="#3e3e3e"/>
                }

                <Text style={[styles.text, checked && styles.checkedText]}>{props.item.content}</Text>

                {
                    props.deletableItem && <Icon name="trash" style={styles.icon} onPress={() => props.onItemDelete(props.item.id)} pressable={true}/>
                }
            </View>
        );
    }
    // return either a pressable or non-pressable item
    return (
        props.pressableItem ? <TouchableOpacity onPress={() => props.onItemPress(props.item.id, props.item.content)}>{render()}</TouchableOpacity> : render()
    );
}

Item.defaultProps = {
    checkableItem: false,
    checked: false,
    deletableItem: false,
    pressableItem: false,
}

const { width,} = Dimensions.get('window');

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
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: "white"
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 18, // scale the font size based on the pixel density of the screen
    },
    icon: {
        width: PixelRatio.getPixelSizeForLayoutSize(20), // scale the icon size based on the pixel density of the screen
        height: PixelRatio.getPixelSizeForLayoutSize(20), // scale the icon size based on the pixel density of the screen
    },
    checkedText: {
        textDecorationLine: "line-through",
        color: "#d63031"
    }
});