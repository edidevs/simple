import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Context } from '../Theme';

const MoreOptionItem = (props) => {
    let c = useContext(Context);
    c = c || {};
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}>
            <View style={styles.icon}>
                {props.icon}
            </View>
            <Text style={[styles.text, { color: c.textColor }]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        left: 0, right: 0,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    icon: {
        width: 40
    }
});

export { MoreOptionItem };