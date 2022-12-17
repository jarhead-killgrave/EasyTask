import { StyleSheet, View, Text, Dimensions } from 'react-native';


export default function ProgressBar(props={progress: 0, style: {}}) {

    const percentage = props.progress * 100;

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.progress, { width: `${percentage}%` }]}>
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
