// importing needed modules
import React from 'react';
import { View } from 'react-native';

// CardSection Reusable component declaration
const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle , props.style]}>
            {props.children}
        </View>
    );
};

// styling the CardSection
const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

// exporting CardSection component to be user by index.js file
export { CardSection };