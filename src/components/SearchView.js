// importing needed modules and Components
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Spinner, Confirm } from './common';

// importing needed Actions
import { signOutUser } from '../actions';

// Search View Class Declaration
class SearchView extends Component {

    // component state
    state = { showModal: false };

    // function calling action responsible for user logout
    onAccept() {
        this.props.signOutUser();
        this.setState({ showModal: false });
    }

    // render component to device
    render() {
        return (
            <Card>
                <CardSection style={styles.CardSectionStyle} >
                    <Text style={styles.TextStyle}>
                        What do you want to watch ?
                    </Text>
                </CardSection>

                <CardSection>
                    <Button block
                        style={styles.ButtonStyle}
                        textStyle={{ color: 'white' }}
                        onPress={() => Actions.favouritesList()}>
                        <Icon name="star" style={{ color: 'white' }} />
                        <Text>MY FAVOURITES</Text>
                    </Button>
                </CardSection>

                <CardSection>
                    <Button block
                        style={styles.ButtonStyle}
                        textStyle={{ color: 'white' }}
                        onPress={() => this.setState({ showModal: true })}>
                        <Icon name="log-out" style={{ color: 'white' }} />
                        <Text>LOGOUT</Text>
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={() => this.setState({ showModal: false })}>
                    Are you sure you want to Log Out??
                </Confirm>

            </Card>
        );
    }
}

// Component Styles
const styles = {
    CardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 60
    },
    TextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 50,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 100
    },
    ButtonStyle: {
        backgroundColor: '#2F225C',
        flex: 1
    }
}

// exporting SearchView Component to other Components
export default connect(null, { signOutUser })(SearchView);