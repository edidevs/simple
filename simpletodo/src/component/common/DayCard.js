import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'res/colors.json';
import { Context } from '../Theme';

const DayCard = (props) => {
    onPress = () => {
        props.onPress(props.children);
    }
    let c = useContext(Context);
    c = c || {};
    return (
        <View style={[styles.container, { backgroundColor: c.bgDark }]}>
            <Text style={[styles.dayText, { color: c.textColor }]}>{props.children}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dayText: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.red
    },
    icon: {
        padding: 5
    }
});

export { DayCard };