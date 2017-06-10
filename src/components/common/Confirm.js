// importing needed modules and components
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

// Confirm Alert Reusable component declaration
const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, CardSectionStyle, textStyle } = styles;
    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType="slide"
            onRequestClose={() => { }}>
            <View style={containerStyle}>
                <CardSection style={CardSectionStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={onAccept}>LOGOUT</Button>
                    <Button onPress={onDecline}>CANCEL</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

// Styling the Alert
const styles = {
    CardSectionStyle: {
        justifyContent: 'center',
        padding: 20
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 50
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'relative'
    }
}

// exporting Confirm component to be user by index.js file
export { Confirm };