import React from 'react';
import {
    View,
    Text,
    Switch,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import db from '../../networking/db';
import {
    DayCard,
    MoreOptionItem,
    Header,
    TopBar,
    ActionButton,
    ThemeChooser,
    Loader
} from '../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'res/colors.json';
import Theme, { Context } from '../Theme';
import TaskList from '../common/TaskList';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            showchooseThemeView: false,
            showMoreOption: false,
            showThemeChooser: false,
            loading: false
        }
        this.props.saveThemeInfo();
        // this.props.getTasksFromStorage();
    }

    // static async getDerivedStateFromProps(props) {
    //     let result = await AsyncStorage.setItem('tasks', JSON.stringify(props.taskArray));
    //     console.warn("Result set item ", result);
    //     console.warn("array ", props.taskArray);
    //     return null;
    // }

    onPress = (day) => {
        this.props.navigation.navigate('AddTasks', { day });
    }

    logoutUser = async () => {
        this.setState({ loading: true, showMoreOption: false });
        const response = await db.logoutUser();
        if (response) {
            this.props.refreshTasks([]);
            this.setState({ loading: false });
            this.props.navigation.navigate('Auth');
        }
    }

    async componentDidMount(){
        let result = await AsyncStorage.getItem('tasks');
        console.warn("Reuslt did mount", result);
    }

    syncTasks = async () => {
        console.log('sync')
        this.setState({ loading: true, showMoreOption: false });
        const { taskArray } = this.props;
        const message = await db.syncTasks(taskArray);
        if (message) {
            const tasks = await db.getAllTasks(); //fetch all task
            this.props.refreshTasks(tasks);
            this.setState({ loading: false });
        } else {
            this.setState({ loading: false });
        }
    }

    renderMoreOption(value) {
        if (!this.state.showMoreOption) { return; }
        return (
            <View style={[styles.moreOptions, { backgroundColor: value.bgLight }]}>
                
                
                <MoreOptionItem
                    icon={<AntDesign name='closecircleo' size={15} color={value.textColor} />}
                    onPress={() => {
                        this.props.clearCompleted();
                        this.setState({ showMoreOption: false });
                    }}>
                    Clear Completed
                </MoreOptionItem>
                <MoreOptionItem
                    icon={<AntDesign name='logout' size={20} color={value.textColor} />}
                    onPress={this.logoutUser}>
                    Log out
                </MoreOptionItem>
                
            </View>
        );
    }

    renderThemeChooser() {
        if (!this.state.showThemeChooser) { return null; }
        return (
            <ThemeChooser onPress={(value) => {
                this.props.toggleThemeColor(value);
                this.setState({ showThemeChooser: false });
            }} />
        );
    }

    async componentDidMount(){
        let result = await AsyncStorage.getItem("userToken");
        console.warn("Result ", result);
    }

    render() {
        return (
            <Theme name={this.props.theme} bg={'dark'}>
                <Context.Consumer>
                    {value => {
                        return <View style={[styles.container, { backgroundColor: value.bgDark }]}>
                            <TopBar />
                            <Header right='more' onPress={() => this.setState({ showMoreOption: true })}>
                                ALL TO DO LIST YOU HAVE MADE 
                            </Header>
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showMoreOption: false })}>
                                <View style={{ flex: 1 }}>
                                    <DayCard onPress={this.onPress}>
                                        To do list for today
                                    </DayCard>
                                    <TaskList navigation={this.props.navigation}>
                                        today
                                    </TaskList>
                                    
                                    
                                    <ActionButton onPress={this.onPress} />
                                </View>
                            </TouchableWithoutFeedback>
                            {this.renderMoreOption(value)}
                            {this.renderThemeChooser()}
                            {this.state.loading ? <Loader /> : null}
                        </View>
                    }}
                </Context.Consumer>
            </Theme>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    actionButton: {
        position: 'absolute',
        padding: 10,
        borderRadius: 30,
        bottom: 25, right: 25,
    },
    rowText: {
        fontSize: 18,
        color: colors.text,
    },
    moreOptions: {
        position: 'absolute', right: 5, top: 10,
        justifyContent: 'center',
        padding: 10, borderRadius: 5,
        minWidth: 150,
        elevation: 5,
    },
    moreOptionText: {
        fontSize: 16,
        margin: 5,
    },
    title: {
        alignSelf: 'center',
        fontSize: 14,
    },
    darkModeChooser: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    }
};

const mapStateToProps = state => {
    return {
        taskArray: state.tasks.taskArray,
        darkMode: state.ui.darkMode,
        theme: state.ui.theme
    };
}

export default connect(mapStateToProps, actions)(HomeScreen);