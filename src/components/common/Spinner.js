//importing needed modules
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Spinner Reusable component declaration
const Spinner = ({ size }) => {
    return (
        <View style={styles.SpinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

// Styling the Spinner
const styles ={
    SpinnerStyle:{
        flex : 1 ,
        justifyContent : 'center',
        alignItems : 'center'
    }
};

// exporting Spinner component to be user by index.js file
export { Spinner };