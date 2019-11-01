import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

export { Card };