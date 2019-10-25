import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Main from './index';

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}



export default Root;