import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { saveThemeInfo } from '../../actions'
import AsyncStorage from '@react-native-community/async-storage';
import colors from 'res/colors.json';
import Theme from '../Theme';
import bg from '../../resources/react.jpeg';

class Splash extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.props.saveThemeInfo();
        setTimeout(async () => {
            let userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Auth');
            }
        }, 2000);
    }

    render() {
        return (
            <Theme name='red'>
                <View style={styles.container}>
                    <Image source={bg} style={{width: 100, height: 100}} />
                    <Text style={styles.text}>A Very Simple To Do App</Text>
                </View>
            </Theme>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundColor
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.red,
        paddingVertical: 15,
    },
    image: {
        width: 100,
        height: 100
    }
});

export default connect(null, { saveThemeInfo })(Splash);