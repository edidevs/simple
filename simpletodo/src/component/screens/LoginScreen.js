import React from 'react';
import {
    StyleSheet,
    View, TouchableOpacity, TouchableWithoutFeedback,
    StatusBar, SafeAreaView,
    Text, TextInput,
    Keyboard, KeyboardAvoidingView,
    Platform, ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { refreshTasks } from '../../actions';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../../networking/db';
import colors from 'res/colors.json';
import Feather from 'react-native-vector-icons/Feather';
import { Card, Button } from '../common';
import { Loader } from '../common/Loader';

class LoginScreen extends React.Component {
    state = {
        login: true,
        name: '',
        email: '',
        password: '',
        loading: false,
    }

    async onLoginPress() {
        const { email, password } = this.state;
        if (email === '' || password === '') { 
            if (Platform.OS == 'android') {
                        ToastAndroid.show('Harap isi semua, jangan ada yang kosong ya', ToastAndroid.LONG);
                        return this.setState({ loading: false });
            }
         }
        Keyboard.dismiss();
        this.setState({ loading: true });
        // let token = "initoken123"
        // if (email !== 'edi@gmail.com' && password !== 'simplesaja') {
        //     if (Platform.OS == 'android') {
        //         ToastAndroid.show('Maaf, salah password atau email', ToastAndroid.LONG);
        //         return this.setState({ loading: false });
        //     }
        // }
        // await AsyncStorage.setItem('userToken', token);
        const tasks = await db.getAllTasks(); //fetch all task
        console.warn("Tasks ", tasks);
        // this.props.refreshTasks(tasks);
        this.setState({ loading: false });
        if(email == "edi@gmail.com" && password === "12345"){
            await AsyncStorage.setItem('userToken', '12345');
            this.props.navigation.navigate('Home');
        }else{
            if (Platform.OS == 'android') {
                        ToastAndroid.show('Maaf, salah password atau email', ToastAndroid.LONG);
                        return this.setState({ loading: false });
            }
        }
        
    }

    switchForm() {
        this.setState({ login: !this.state.login });
    }

    
    renderLogo() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.logoContainer}>
                <Card>
                    <View style={styles.logo}>
                        
                        <Text style={styles.text}>A Very Simple To do App</Text>
                    </View>
                    
                </Card>
            </KeyboardAvoidingView>
        );
    }

    renderForm() {
        return (
            <View>
                <Card>
                    {this.state.login ? null :
                        <TextInput
                            placeholder="Nama"
                            placeholderTextColor="orange"
                            style={styles.textInput}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                        />}
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="orange"
                        style={styles.textInput}
                        value={this.state.email}
                        keyboardType='email-address'
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="orange"
                        style={styles.textInput}
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </Card>
                <Card>
                    <View style={{ paddingTop: 5 }}>
                        <Button
                            style={{backgroundColor:'orange'}}
                            onPress={() => { this.onLoginPress() }}>
                            {'Sign in'}
                        </Button>
                    </View>
                </Card>
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor="orange"
                    barStyle="light-content"
                />
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {this.renderLogo()}
                        {this.renderForm()}
                        
                        {this.state.loading ? <Loader /> : null}
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: "orange",
        marginHorizontal: 5,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hello: {
        fontSize: 22,
        fontWeight: '500',
        color: "orange",
        padding: 5
    },
    textInput: {
        fontSize: 18,
        fontWeight: '500',
        color: "orange",
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "orange"
    },
    bottomTextView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 15
    },
    bottomText: {
        fontSize: 16,
        fontWeight: '500',
        color: "orange",
    }
});

export default connect(null, { refreshTasks })(LoginScreen);