import React from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import ButtonComponent from "./ui/ButtonComponent";
import ProgressBar from "./ui/ProgressBar";

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
                <Text style={styles.title}>To-Do List : {props.title}</Text>
                <ProgressBar style={styles.progressBar} progress={props.nbDone === 0 ? 0 : props.nbDone / props.nbTotal}/>
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
                                color={props.filter === option ? "#008080" : "#fff"}
                                textColor={props.filter === option ? "#fff" : "#008080"}
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
        justifyContent: "space-between",
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: "#000",
        marginVertical: 10,
    },
    filterOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterOption: {
        flex: 1,
        margin: 5,
    },
    progressBar: {
        flex: 1,
        width: "50%",
    },

});

