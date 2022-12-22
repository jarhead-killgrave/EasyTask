import {StyleSheet, Text, View} from 'react-native';


/**
 * ProgressBar is a React native component that displays a progress bar.
 *
 * @param {Object} props - The properties for the component.
 * @param {number} props.progress - The current progress of the progress bar, between 0 and 1.
 * @param {Object} [props.style] - The style object for the container element.
 * @return {ReactElement} - The rendered progress bar element.
 */
export default function ProgressBar(props) {
    // Calculate the percentage of progress
    const percentage = props.progress * 100;

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.progress, {width: `${percentage}%`}]}>
                <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 20,
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        overflow: "hidden",
    },
    progress: {
        height: "100%",
        backgroundColor: "#B02F13",
        alignItems: "center",
        justifyContent: "center",
        transition: "width 0.5s ease",
    },
    progressText: {
        color: "#fff",
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
});
