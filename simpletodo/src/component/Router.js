import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
import Splash from 'screens/Splash';
import AddTasks from 'screens/AddTasks';

const HomeStackNavigator = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'ALL TASKS',
        }
    },
    AddTasks: {
        screen: AddTasks,
        navigationOptions: {
            headerTitle: 'Create A New To Do List'
        }
    }
}, {
        defaultNavigationOptions: {
            header: null
        }
    });

const Router = createSwitchNavigator({
    Splash: Splash,
    Auth: LoginScreen,
    Home: HomeStackNavigator,
    Test: HomeScreen
},
    {
        initialRouteName: 'Splash',
    },
);

export default createAppContainer(Router);