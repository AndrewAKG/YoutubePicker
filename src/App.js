//importing needed modules and classes
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    // Firebase setup
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyDvYtuK4nBfIWddul3iQ1me0JGg1FfUZ3c",
            authDomain: "youtube-picker-3d5bc.firebaseapp.com",
            databaseURL: "https://youtube-picker-3d5bc.firebaseio.com",
            projectId: "youtube-picker-3d5bc",
            storageBucket: "youtube-picker-3d5bc.appspot.com",
            messagingSenderId: "311504402426"
        };
        firebase.initializeApp(config);
    }

    // Rendering App Class to device
    render() {

        // creating store that will contain reducers and supplied with actions
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

//exporting App class to other Classes
export default App;