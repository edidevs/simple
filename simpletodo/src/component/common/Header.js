import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, PixelRatio, Dimensions, Platform, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'res/colors.json';
const width = Dimensions.get('window').width;
import { Context } from '../Theme';

const calculateFontSize = (fontSize) => {
    if (width > 550) {
        return (fontSize * 2) / PixelRatio.getFontScale();
    } else {
        return fontSize / PixelRatio.getFontScale();
    }
}

const Header = (props) => {
    let c = useContext(Context);
    c = c || {};

    renderLeftIcon = () => {
        if (props.backEnabled) {
            return (
                <TouchableOpacity style={[styles.iconView, styles.leftMargin]} onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={26} color={c.textColor} />
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    renderRightIcon = () => {
        if (props.right === 'more') {
            return (
                <TouchableOpacity style={[styles.iconView, styles.rightMargin]} onPress={props.onPress}>
                    <Entypo name='dots-three-vertical' size={20} color={c.textColor} />
                </TouchableOpacity>
            );
        }
    }

    return (
        <View style={[styles.container, props.style, { backgroundColor: c.bgLight }]}>
            <Text style={[styles.text, { color: c.textColor }]}>
                {props.children}
            </Text>
            {this.renderLeftIcon()}
            {this.renderRightIcon()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 0 : 24,
        height: 56, left: 0, right: 0,
        backgroundColor: colors.backgroundColor,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView: {
        position: 'absolute',
        height: 45,
        aspectRatio: 1,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftMargin: {
        left: 0,
        marginRight: 5,
    },
    rightMargin: {
        right: 0,
        marginRight: 5
    },
    text: {
        fontSize: calculateFontSize(16),
        fontWeight: '500',
        color: colors.title
    }
});

export { Header };