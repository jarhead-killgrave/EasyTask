import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ButtonComponent from "./ui/ButtonComponent";
import ProgressBar from "./ui/ProgressBar";

/**
 * A component that renders a header for the to-do list app.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title of the to-do list.
 * @param {number} props.nbDone - The number of completed tasks in the list.
 * @param {number} props.nbTotal - The total number of tasks in the list.
 * @param {string[]} props.filterOptions - The options for filtering the list of tasks.
 * @param {string} props.filter - The currently selected filter option.
 * @param {function} props.setFilter - A function to set the filter option.
 */
export default function Header(props) {
    // Calculate the progress as a percentage of tasks completed
    const progress = props.nbDone === 0 ? 0 : props.nbDone / props.nbTotal;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>To-Do List : {props.title}</Text>
                <ProgressBar style={styles.progressBar} progress={progress} />
            </View>
            <View style={styles.separator} />
            <View style={styles.filterOptions}>
                {
                    props.filterOptions.map((option, index) => {
                            // Determine the background and text colors for the filter option button
                            const bgColor = props.filter === option ? "#B02F13" : "#fff";
                            const textColor = props.filter === option ? "#fff" : "#B02F13";

                            return (
                                <ButtonComponent
                                    style={styles.filterOption}
                                    key={index}
                                    title={option}
                                    color={bgColor}
                                    textColor={textColor}
                                    onPress={() => props.setFilter(option)}
                                />
                            );
                        }
                    )
                }
            </View>
            <View style={styles.separator} />
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

