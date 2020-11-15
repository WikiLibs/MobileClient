import * as React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper'
import TreeView from '../../tools/TreeView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const langToImage = {
    'C': require('../../resources/c_icon.png'),
    'C++': require('../../resources/cpp_icon.png'),
    'Java': require('../../resources/java_icon.png'),
    'Python 3': require('../../resources/python_icon.png')
}

export default class TreeViewLibList extends React.Component {
    state = {
        langId: 0,
        langName: '',
        libs: []
    }

    componentDidMount = async () => {
        let langId = this.props.route.params.params.langId
        let langName = this.props.route.params.params.langName
        this.setState({
            langId: langId,
            langName: langName
        })

        await global.api.getLibs(langId).then(result => {
            this.setState({libs: result.data.data})
        })
    }

    onPressTreeView = (lib) => () => {
        this.props.navigation.navigate("TreeViewPage", {
            params: {
                libId: lib.id,
                libName: lib.name,
                langId: this.state.langId,
                langName: this.state.langName
            }
        })
    }

    onPressInfo = (lib) => () => {
        this.props.navigation.navigate("LibInfo", {
            params: {
                libId: lib.id,
                libName: lib.name,
                langId: this.state.langId,
                langName: this.state.langName
            }
        })
    }

    renderCard = (lib) => {
        return (
            <TouchableOpacity style={styles.card}>
                <Card>
                    <Card.Content>
                        <Title>{lib.name.split("/").pop()}</Title>
                    </Card.Content>
                    <Card.Actions style={{justifyContent: 'flex-end'}}>
                        <Button onPress={this.onPressTreeView(lib)} mode="outlined" color='#7B68EE' style={{marginRight: 8}}>Tree View</Button>
                        <Button onPress={this.onPressInfo(lib)} mode="contained" color='#7B68EE'>Infos</Button>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
        )
    }

    render () {
        return (
            <ScrollView>
                <View style={{display: 'flex', flexDirection: 'row', padding: 16, backgroundColor: '#dedede'}}>
                    <Image style={styles.cardImage} source={langToImage[this.state.langName]} />
                    <Text style={styles.topTitle}>{this.state.langName} - Libraries</Text>
                </View>
                {this.state.libs
                    ? this.state.libs.map(lib =>
                        this.renderCard(lib)
                    )
                    : null
                }
                <View style={{height: 8}} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    topTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30
    },
    card: {
        margin: 8,
        flexGrow: 1
    },
    cardImage: {
        height: 40,
        width: 40,
        marginRight: 16
    },
    libContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8
    },
    infoContainer: {
        height: 50,
        width: 50,
        borderRadius: 4,
        backgroundColor: '#7B68EE',
        padding: 13
    }
})