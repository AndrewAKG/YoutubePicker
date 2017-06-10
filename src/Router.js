// importing needed modules and classes
import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import SearchView from './components/SearchView';
import YoutubeList from './components/YoutubeList';
import UserFavourites from './components/UserFavourites';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

//importing needed Actions
import { userNavigate, searchWordChanged, searchYoutube } from './actions';

class RouterComponent extends React.Component {

    // function handling search word input change
    onSearchWordChange(text) {
        this.props.searchWordChanged(text);
    }

    // function responsible for calling searchyoutube action upon user press search button
    onSearchYoutube() {
        this.props.searchYoutube();
    }

    // rendering search bar in react-native-router-flux navigation bar header
    renderSearchTitle() {
        return (
            <Container>
                <Header
                    style={{ backgroundColor: '#2F225C' }}
                    searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="search"
                            onChangeText={this.onSearchWordChange.bind(this)}
                        />
                        <Button transparent
                            onPress={this.onSearchYoutube.bind(this)}>
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>
            </Container>
        );
    }

    //  rendering router Component to device
    render() {
        return (
            <Router
                sceneStyle={{ paddingTop: 60 }}
                titleStyle={{ paddingTop: 10, fontSize: 20, fontWeight: 'bold' }}
                rightButtonTextStyle={{ fontWeight: 'bold', color: '#2F225C' }}
                backButtonTextStyle={{ fontWeight: 'bold', color: '#2F225C' }}
            >
                <Scene key="auth" >
                    <Scene
                        key="login"
                        component={LoginForm}
                        rightTitle="SignUp"
                        title="YouTube-Picker"
                        onRight={() => {
                            this.props.userNavigate();
                            Actions.signUp();
                        }
                        }
                        initial />
                    <Scene
                        key="signUp"
                        component={SignUpForm}
                        title="SignUp"
                    />
                </Scene>

                <Scene key="main">
                    <Scene
                        key="search"
                        component={SearchView}
                        renderTitle={this.renderSearchTitle.bind(this)}
                    />
                    <Scene
                        key="youtubeList"
                        component={YoutubeList}
                        title="Search Results" />
                    <Scene
                        key="favouritesList"
                        component={UserFavourites}
                        title="My Favourites" />
                </Scene>
            </Router>
        );
    }
}

// mapping current state to props
const mapStateToProps = (state) => {
    const { searchWord, error, loading } = state.search;

    return { searchWord, error, loading };
};

// exporting router component to other classes
export default connect(mapStateToProps, { userNavigate, searchWordChanged, searchYoutube })(RouterComponent);
