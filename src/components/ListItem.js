// importing needed modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Linking, Image, TouchableWithoutFeedback, Alert, WebView } from 'react-native';
import {
    Container, Content, Card, CardItem,
    Text, Button, Thumbnail,
    Icon, Left, Body, Toast
} from 'native-base';

// importing needed Actions
import { AddingToFavourites, InitiatingState, FavouriteDelete } from '../actions';

// ListItem Component Declaration which represent a single video info on the screen
class ListItem extends Component {

    // function calling action responsible for adding specific video to user favourites
    AddToFavourites() {
        this.props.AddingToFavourites({ snippet: this.props.video.snippet, id: this.props.video.id });
    }

    // function calling action responsible for removing specific video from user favourites
    RemoveFromFavourites() {
        const { uid } = this.props.video;
        this.props.FavouriteDelete({ uid });
    }

    // rendering button according to current view
    // renders Add to Favourites in Youtube List View
    // renders Remove from Favourites in Favourites List View
    renderButton() {
        if (this.props.youtubeView) {
            return (
                <Button
                    onPress={this.AddToFavourites.bind(this)}
                    style={{ backgroundColor: '#2F225C' }}
                    block textStyle={{ color: 'white' }}>
                    <Icon name="star" style={{ color: 'white' }} />
                    <Text>Add to Favourites</Text>
                </Button>
            );
        }
        else {
            return (
                <Button
                    onPress={this.RemoveFromFavourites.bind(this)}
                    style={{ backgroundColor: '#2F225C' }}
                    block textStyle={{ color: 'white' }}>
                    <Icon name="star" style={{ color: 'white' }} />
                    <Text>Remove from Favourites</Text>
                </Button>
            );
        }
    }

    // rendering component to device
    render() {

        // destructuring needed elements from the props
        const { videoId } = this.props.video.id;
        const { title, description, thumbnails, channelTitle, publishedAt } = this.props.video.snippet;
        const { url } = thumbnails.high;
        const link = "https://www.youtube.com/watch?v=" + videoId;
        const playLink = '<iframe id="player" type="text/html" width="stretch" height="390" src="http://www.youtube.com/embed/' + videoId + '?enablejsapi=1&origin=http://example.com"></iframe>'
            + '<script> var tag = document.createElement(\'script\');'
            + 'tag.src = "https://www.youtube.com/iframe_api";'
            + 'var firstScriptTag = document.getElementsByTagName(\'script\')[0];'
            + 'firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);'
            + 'var player;'
            + 'function onYouTubeIframeAPIReady() {'
            + 'player = new YT.Player(\'player\', { events: { \'onReady\': onPlayerReady,\'onStateChange\': onPlayerStateChange   } });}'
            + 'function onPlayerReady(event) {'
            + 'event.target.playVideo(); }'
            + 'var done = false;'
            + 'function onPlayerStateChange(event) {'
            + 'if (event.data == YT.PlayerState.PLAYING && !done) {'
            + 'setTimeout(stopVideo, 6000);'
            + 'done = true; } }'
            + 'function pauseVideo(){ player.pauseVideo();}'
            + 'function stopVideo() {    player.stopVideo(); } </script>';


        var videoDate = new Date(publishedAt);
        var videoYear = videoDate.getFullYear();
        var publishingYear = "Published in " + videoYear;

        return (
            <Container>
                <Content>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Body>
                                <Text style={styles.TitleStyle}>{title}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <WebView
                                source={{ html: playLink }}
                                style={styles.ImageStyle}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.TextStyle}>
                                    Description :
                                </Text>
                                <Text>
                                    {description}
                                </Text>
                                <Text style={styles.TextStyle}>
                                    Channel :
                                    </Text>
                                <Text>
                                    {channelTitle}
                                </Text>
                                <Text>
                                    {publishingYear}
                                </Text>
                                {this.renderButton()}
                            </Body>
                        </CardItem>
                    </Card>
                </Content >
            </Container >
        );
    }
}

// Component Styles
const styles = {
    ImageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    TitleStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    TextStyle: {
        fontWeight: 'bold'
    }
}

// mapping current state to props
const mapStateToProps = (state) => {
    const { error, youtubeView } = state.search;

    return { error, youtubeView };
}

// exporting ListItem Component to other Components
export default connect(mapStateToProps,
    { AddingToFavourites, InitiatingState, FavouriteDelete })
    (ListItem);

/*
//Clickable Image
<TouchableWithoutFeedback
    onPress={() => Linking.openURL(link)}>
    <CardItem>
        <Image
            style={styles.ImageStyle}
            source={{ uri: url }} />
    </CardItem>
</TouchableWithoutFeedback>
*/