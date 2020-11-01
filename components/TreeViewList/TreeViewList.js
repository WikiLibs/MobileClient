import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-paper'

const LeftContent = (props, imageSource) => <Avatar.Image {...props} source={imageSource} />

const langToImage = {
    'C': require('../../resources/c_icon.png'),
    'CPP': require('../../resources/cpp_icon.png'),
    'JAVA': require('../../resources/java_icon.png'),
    'PYTHON3': require('../../resources/python_icon.png')
}

export default class TreeViewList extends React.Component {
    state = {
        langs: null
    }

    componentDidMount = async () => {
        await global.api.getSymLangs().then(langs => {
            this.setState({langs: langs})
        })
    }

    onClickCard = (lang) => () => {
        this.props.navigation.navigate("TreeViewPage", {
            params: {
                langId: lang.id,
                langName: lang.displayName
            }
        })
    }

    renderCard = (cardTitle, imageSource, lang) => {
        return (
            <TouchableOpacity onPress={this.onClickCard(lang)} style={styles.card}>
                <Card style={styles.cardContainer}>
                    <Card.Title
                        title={cardTitle}
                        left={() => <Image style={styles.cardImage} source={imageSource} />}
                    />
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView>
                {this.state.langs
                    ? this.state.langs.data.map((lang, index) =>
                        this.renderCard(lang.displayName, langToImage[lang.name], lang)
                    )
                    : null
                }
                <View style={{height: 8}} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 16,
        marginBottom: 0
    },
    cardImage: {
        height: 40,
        width: 40
    },
    header: {
        height: 200,
        backgroundColor: 'black'
    },
    backgroundImage: {
        flex: 1
    },
    headerContainer: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerImageTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 1
    },
    headerTextContainer: {
        marginLeft: 32,
        marginRight: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerTextTop: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 21
    },
    headerTextBottom: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1
    },
    headerImage: {
        height: 100,
        width: 100,
        marginLeft: 32
    },
    mainContent: {
        margin: 32,
        marginTop: 64
    },
    mainContentTitleText: {
        color: '#4C3DA8',
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center',
        margin: 16
    },
    bubbleContainer: {
        height: 200,
        margin: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bubbleImage: {
        width: 150,
        height: 150
    },
    bubbleText: {
        color: '#4C3DA8',
        textAlign: 'center'
    },
    mainContentGreyContainer: {
        backgroundColor: '#EBEBEB'
    }
});