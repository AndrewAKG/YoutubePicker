//importing needed modules
import React from 'react';
import { View, Text, TextInput } from 'react-native';

// Input Reusable component declaration
const Input = ({ label, value, onChangeText, placeholder, secure }) => {
    const { containerStyle, inputStyle, labelStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle} >{label}</Text>
            <TextInput
                secureTextEntry={secure}
                autoCorrect={false}
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );

};

// Styling the input
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

// exporting Confirm component to be user by index.js file
export { Input };
