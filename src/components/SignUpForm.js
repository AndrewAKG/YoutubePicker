// importing needed modules and components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Alert } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { Card, CardSection, Input, Spinner } from './common';

// importing needed Actions
import { emailChanged, passwordChanged, signUpUser, userNavigate } from '../actions';

// LoginForm Class Declaration 
class SignUpForm extends Component {

   // function calling Action responsible for handling email input change
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    // function calling Action responsible for handling password input change
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    // function calling Action responsible for handling user login
    onButtonPress() {
        const { email, password } = this.props;

        this.props.signUpUser({ email, password });
    }

    // function rendering spinner according to loading state
    renderSpinner() {
        if (this.props.loading) {
            return <Spinner />
        }
    }

    // function rendering Alert upon Sign Up fail or success to notify the user
    renderAlert() {
        if (this.props.error == 'success') {
            setTimeout(() => {
                Alert.alert(
                    'Account Created Successfully',
                    'You Can now Login',
                    [
                        { text: 'OK', onPress: () => Actions.login({ type: 'reset' }) },
                    ],
                    { cancelable: false }
                );
            }, 5)
        }
        else if (this.props.error == 'SignUp_Failed') {
            setTimeout(() => {
                Alert.alert(
                    'Account Creation failed',
                    'UserName already taken !! or Maybe server is down',
                    [
                        { text: 'OK', onPress: () => { this.props.userNavigate() } },
                    ],
                    { cancelable: false }
                );
            }, 5);

        }
    }

    // rendering component to device
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        secure={true}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                {this.renderAlert()}

                <CardSection>
                    {this.renderSpinner()}
                </CardSection>

                <CardSection>
                    <Button
                        style={{ backgroundColor: '#2F225C', flex: 1 }}
                        block textStyle={{ color: 'white' }}
                        onPress={this.onButtonPress.bind(this)}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text>SIGN UP</Text>
                    </Button>
                </CardSection>
            </Card>

        );
    }
}

// mapping current state to props
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

// exporting SignUpForm component to other Components
export default connect(mapStateToProps,
    {
        emailChanged,
        passwordChanged,
        signUpUser,
        userNavigate
    })
    (SignUpForm);
