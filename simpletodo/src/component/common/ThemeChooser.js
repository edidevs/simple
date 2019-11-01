import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'res/colors.json';
import { Context } from '../Theme';

const ThemeChooser = (props) => {
    let c = useContext(Context);
    c = c || {};
    return (
        <View style={[styles.chooseThemeView, { backgroundColor: c.bgLight }]}>
            <Text style={[styles.title, { color: c.textColor }]}>Choose theme</Text>
            <View style={styles.colorBox}>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => props.onPress('red')}>
                    <FontAwesome name='circle' size={24} color={colors.red} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => props.onPress('green')}>
                    <FontAwesome name='circle' size={24} color={colors.green} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => props.onPress('blue')}>
                    <FontAwesome name='circle' size={24} color={colors.blue} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => props.onPress('orange')}>
                    <FontAwesome name='circle' size={24} color={colors.orange} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => props.onPress('purple')}>
                    <FontAwesome name='circle' size={24} color={colors.purple} />
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    chooseThemeView: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        marginLeft: -100,
        elevation: 1,
        padding: 25,
        minWidth: 200,
        borderRadius: 10,
    },
    colorBox: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
});

export { ThemeChooser };