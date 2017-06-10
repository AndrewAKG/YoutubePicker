// importing needed modules and components
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Toast, Container, Content, Spinner } from 'native-base';
import ListItem from './ListItem';

// YoutubeList Class Declaration
class YoutubeList extends Component {

    // life cycle method
    componentWillMount() {
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
        if (this.props.error === 'Added_Successfully') {
            this.alertFunction('Added to Favourites Successfully');
        }
        else if (this.props.error === 'Adding_Failed') {
            this.alertFunction('Adding Failed check your internet connection or maybe server is down');
        }
    }

    // rendering spinner
    renderSpinner() {
        if (this.props.loading) {
            return <Spinner style={{ alignSelf: 'center' }} />
        }
    }

    // Rendering  ListView Row
    renderRow(video) {
        return <ListItem video={video} />
    }

    // rendering component to device
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

// mapping current state to props
const mapStateToProps = state => {

    const videos = _.map(state.videos, (val, index) => {
        return { ...val };
    });

    const { error } = state.search;

    return { videos, error };
}

// exporting YouTubeList Component to other Components
export default connect(mapStateToProps)(YoutubeList);