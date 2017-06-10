// importing needed modules and components
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import { Card, CardSection, Input, Spinner } from './common';
import { Button, Text, Icon } from 'native-base';

// importing needed Actions
import { emailChanged, passwordChanged, loginUser, userNavigate } from '../actions';

// LoginForm Class Declaration 
class LoginForm extends Component {

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

        this.props.loginUser({ email, password });
    }

    // function rendering spinner according to loading state
    renderSpinner() {
        if (this.props.loading) {
            return <Spinner />
        }
    }

    // function rendering Alert upon Login fail to notify the user
    renderAlert() {
        if (this.props.error === 'Login_Failed') {
            Alert.alert(
                'Authentication Failed!',
                'UserName or Password inCorrect !! or Maybe server is down',
                [
                    { text: 'OK', onPress: () => { this.props.userNavigate() } },
                ],
                { cancelable: false }
            );
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
                        <Icon name="log-in" style={{ color: 'white' }} />
                        <Text>LOGIN</Text>
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

// exporting LoginForm Component to other Components
export default connect(mapStateToProps,
    {
        emailChanged,
        passwordChanged,
        loginUser,
        userNavigate
    })
    (LoginForm);
