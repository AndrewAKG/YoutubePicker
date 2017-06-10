// importing needed modules
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Button Reusable component declaration
const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

// Styling the Button
const styles = {
    textStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#2F225C',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#000',
        marginLeft: 5,
        marginRight: 5
    }
}

// exporting CardSection component to be user by index.js file
export { Button };