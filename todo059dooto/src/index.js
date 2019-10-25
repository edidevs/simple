'use strict';
 
import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';
 
import {Router, Scene, Reducer} from 'react-native-router-flux';
 
import Home from './components/home'
import NewQuote from './components/NewQuote'
import Scene2 from './components/Scene2'


import {connect} from 'react-redux';
import {getQuotes} from './actions'
import Data from '../list.json';
//Reducer for Router - See react-native-router-flux package README for more info
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};
 
class Main extends Component {
 
    componentDidMount() {
        var _this = this;
        //Check if any data exist
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data === null){
                AsyncStorage.setItem('data', JSON.stringify(Data.quotes));
                _this.props.getQuotes();
            }
        });
    }
 
    render() {
        return (
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate}>
                    <Scene key="root">
                        <Scene key="Home" component={Home} title="Simple ToDo APP" initial/>
                        <Scene key="NewQuote" component={NewQuote} title="Create a new List"/>
                        <Scene key="Scene2" component={Scene2} title="Todo APP with API"/>
                            
                    </Scene>
                </Router>
            </View>
        );
    }
}
 
function mapStateToProps(state, props) {
    return {}
}
 
//Connect everything
export default connect(mapStateToProps, {getQuotes})(Main);