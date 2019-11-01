import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from 'res/colors.json';
import { Context } from '../Theme';

const Button = (props) => {
    let c = useContext(Context);
    c = c || {};
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.8}
            style={[styles.buttonStyle, { backgroundColor: c.bgDark || colors.button, }]}>
            <Text style={[styles.textStyle, { color: c.textColor || colors.white, }]}>{props.children}</Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 5
    },
    buttonStyle: {
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingVertical: 12,
        // elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { Button };