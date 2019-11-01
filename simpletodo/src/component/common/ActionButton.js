import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import { Context } from '../Theme';

const ActionButton = (props) => {
    onPress = () => {
        props.onPress('Today');
    }
    let c = useContext(Context);
    c = c || {};
    return (
        <TouchableOpacity style={[styles.actionButton, {flexDirection:'row'}]}
            onPress={onPress}>
            <Text style={{color:'orange', fontSize: 20}}>Tambah Task</Text>
            <Entypo name='plus' size={30} color="orange" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        position: 'absolute',
        padding: 10,
        borderRadius: 30,
        bottom: 25, right: 25,
    }
});

export { ActionButton };