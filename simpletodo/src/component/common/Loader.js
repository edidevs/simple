import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Context } from '../Theme';
import colors from '../../resources/colors.json';

const Loader = () => {
    let c = useContext(Context);
    c = c || {};
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={c.textColor || colors.red} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        elevation: 1,
        top: 0, bottom: 0,
        left: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

export { Loader };