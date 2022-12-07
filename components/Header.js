import React from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import ButtonComponent from "./form/ButtonComponent";

/**
 * Header of the application
 * @param props the properties of the component
 * @constructor the constructor of the component
 * @returns {JSX.Element} the component
 */
export default function Header(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>To-Do List</Text>
                <Text style={styles.subtitle}>{props.nbDone} / {props.nbTotal}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.filterOptions}>
                {
                    props.filterOptions.map((option, index) => {
                        return (
                            <ButtonComponent
                                style={styles.filterOption}
                                key={index}
                                title={option}
                                color={option === props.filter ? "#841584" : "#000"}
                                onPress={() => props.setFilter(option)}
                            />
                        );
                    }
                    )
                }
            </View>
            <View style={styles.separator}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        height: 1,
        backgroundColor: "#000",
        marginVertical: "2%",
    },
    filterOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterOption: {
        flex: 1,
        margin: 5,
    }
});

