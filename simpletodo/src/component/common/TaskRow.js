import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'res/colors.json';
import { Context } from '../Theme';


const TaskRow = (props) => {
    let c = useContext(Context);
    c = c || {};
    markDone = () => {
        props.onMarkDone(props.task);
    }
    unMarkDone = () => {
        props.onUnMarkDone(props.task);
    }
    deleteTask = () => {
        props.onDelete(props.task);
    }
    onLongPress = () => {
        props.onEdit(props.task);
    }

    onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 100) {
                props.onMarkDone(props.task);
            }
            if (nativeEvent.translationX < -100) {
                props.onUnMarkDone(props.task);
            }
        }
    }

    return (
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
            <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
                {props.done ?
                    <TouchableOpacity onPress={unMarkDone}>
                        <Ionicons name='ios-checkmark-circle' size={40} color={colors.grey} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={markDone}>
                        <Ionicons name='ios-radio-button-off' size={40} color={c.textColor} />
                    </TouchableOpacity>}
                <Text style={[styles.rowText, props.done ? { textDecorationLine: 'line-through', color: colors.grey } : { color: c.textColor }]}>
                    {props.children}
                </Text>
                {props.done ?
                    <TouchableOpacity onPress={deleteTask}>
                        <Text style={{color:'orange', fontSize: 25}}>Delete</Text>
                    </TouchableOpacity> : null}
            </TouchableOpacity>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rowText: {
        fontSize: 30,
        color: "orange",
        paddingHorizontal: 10,
        flex: 1,
    },
}
);

export { TaskRow };