'use strict';
 
import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, TouchableWithoutFeedback,
    FlatList,
    Button
}  from 'react-native';
import ActionSheet from 'react-native-actionsheet';
 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
 
import * as ReduxActions from '../actions/index'; //Import your actions
 
import {Actions} from 'react-native-router-flux';
  
//Buttons for Action Sheet
var options = [ 'Edit', 'Delete', 'Cancel'];
 
const CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 2;
 
var _this;
  
class Home extends Component {
    constructor(props) {
        super(props);
 
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds,
            selectedQuote: '',
            longitude: null,
            latitude: null
        }
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
    }

    showActionSheet(quote) {
        this.ActionSheet.show();
        this.state.selectedQuote = quote;
    }

    handlePress(buttonIndex) {
        if (buttonIndex === 0) Actions.NewQuote({quote: this.state.selectedQuote, edit: true, title:"Edit Quote"});
        else if (buttonIndex === 1) _this.props.deleteQuote(this.state.selectedQuote.id);
    }
 
    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert("You can use the location")
            }
            else {
                alert("Location permission denied")
            }
        }
        catch (err) {
            console.warn(err)
        }
        this.props.getQuotes();
        _this = this;
        navigator.geolocation.getCurrentPosition(
            (position) => {
            // console.log(position);
              this.setState({
                
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  
                
              });
            },
            (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );
    }
 
    render() {
        // console.warn("LONGITUDE", this.state.longitude);
        console.warn("data ", this.state.ds.cloneWithRows(this.props.quotes))
        console.warn("QUOT")
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                    {this.state.longitude && this.state.latitude && 
                    <View style={{ alignItems:'center'}}>
                        <Text>Your Current position</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text>
                            {
                                `Longitude: ${this.state.longitude}
                            `}
                            </Text>
                            <Text>
                            {
                                ` Latitude: ${this.state.latitude}
                            `}
                            </Text> 
                        </View>
                        </View>}
                        <Button
                        style={{width: 200, height:200, alignItems: 'flex-start'}}
                        onPress={() => Actions.Scene2()}
                        title="Access todo with api"
                    
                    />
                    <ListView enableEmptySections={true}
                              dataSource={this.state.ds.cloneWithRows(this.props.quotes)}
                              renderRow={this.renderRow.bind(this)}/>
                    {/* <FlatList

                        data={this.state.ds.cloneWithRows(this.props.quotes)}
                        renderItem={({item, index, separators}) => (
                            <TouchableHighlight
                            onPress={() => {
                                return this.renderRow(item, item.id, item.id)
                            }}
                            >
                            <View style={{backgroundColor: 'white'}}>
                                <Text>{item.author}</Text>
                                <Text>{item.quote}</Text>
                            </View>
                            </TouchableHighlight>
                        )}
                    /> */}
                    
                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.NewQuote()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }
 
    renderRow(rowData, sectionID, rowID) {
        console.warn("row data", rowData);
        console.warn("section id", sectionID);
        console.warn('rowID', rowID);
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=> this.showActionSheet(rowData)}>
                    <View style={styles.row}>
                        <Text style={styles.description}>
                            {rowData.quote}
                        </Text>
                        <Text style={styles.author}>
                            {rowData.author}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        )
    }
};
 
 
// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        quotes: state.dataReducer.quotes
    }
}
 
// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}
 
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);
 
var styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
 
    row: {
        backgroundColor: "#fff",
        padding: 8 * 2,
        marginBottom: 1
    },
 
    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },
 
    quote: {
        marginTop: 5,
        fontSize: 14,
    },
 
    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});