// importing needed modules and components
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Toast, Container, Content , Spinner } from 'native-base';
import ListItem from './ListItem';

// importing needed Actions
import { userFavouritesFetch } from '../actions';

// UserFavourites Class Declaration
class UserFavourites extends Component {

    // life cycle methods calling action responsible for detching user favourites
    componentWillMount() {
        this.props.userFavouritesFetch();
        this.createDataSource(this.props);
    }

    // life cycle method
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    // creating ListView Data Source
    createDataSource({ videos }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(videos);
    }

    // notifying user with a Toast
    alertFunction(message) {
        Toast.show({
            supportedOrientations: ['portrait', 'landscape'],
            text: message,
            position: 'bottom',
            buttonText: 'Ok'
        });
    }

    // function notifying user upon removing a video from Favourites Successfully 
    renderAlert() {
        if (this.props.error === 'Removed_Successfully') {
            this.alertFunction('Removed from favourites Successfully');
        }
    }

    // render Spinner
    renderSpinner() {
        if (this.props.loading) {
            return <Spinner style={{ alignSelf: 'center' }} />
        }
    }

    // Rendering  ListView Row
    renderRow(video) {
        return <ListItem video={video} />
    }

    // Rendering component to device
    render() {
        return (
            <Container>
                <Content>
                    {this.renderSpinner()}
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                    {this.renderAlert()}
                </Content>
            </Container>

        );
    }
}

// mapping current State to props
const mapStateToProps = state => {
    const videos = _.map(state.videos, (val, uid) => {
        return { ...val, uid };
    });

    const { error, loading } = state.search;

    return { videos, error, loading };
}

// exporting UserFavourite Components to other Components
export default connect(mapStateToProps, { userFavouritesFetch })(UserFavourites);