import * as React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import TreeView from '../../tools/TreeView'
import showToast from './../../tools/Toast'

export default class TreeViewPage extends React.Component {
    state = {
        libId: 0,
        libName: '',
        langId: 0,
        langName: '',
        data: [],
        isLoading: false
    }

    componentDidMount = async () => {
        let libId = this.props.route.params.params.libId
        let libName = this.props.route.params.params.libName
        let langId = this.props.route.params.params.langId
        let langName = this.props.route.params.params.langName
        this.setState({
            libId: libId,
            libName: libName,
            langId: langId,
            langName: langName,
            isLoading: true
        })

        await global.api.getLibElements(libId).then(result => {
            this.setState({
                data: this.getFormattedResponseWithTypes(result.data),
                isLoading: false
            })
        })
    }

    getFormattedResponseWithTypes = (response) => {
        let baseLibContents = []
        let tmpTypes = []

        response.forEach(elem => {
            tmpTypes.push(elem.type)
        })
        tmpTypes = [...new Set(tmpTypes)].sort()
        tmpTypes.forEach(type => {
            baseLibContents.push({
                id: type,
                name: type,
                subContent: []
            })
        })
        
        response.forEach(elem => {
            baseLibContents.forEach(typeContents => {
                if (typeContents.name === elem.type)
                    typeContents.subContent.push({
                        id: elem.id,
                        name: elem.firstPrototype,
                        subContent: null
                    })
            })
        })

        return baseLibContents
    }

    getElemToModify = (data, keyToGet, level) => {
        for (let i = 0 ; i < data.length ; i++) {
            if (data[i].name == keyToGet[level]) {
                if (level === keyToGet.length - 1)
                    return (data[i])
                return (this.getElemToModify(data[i].subContent, keyToGet, level + 1))
            }
        }
        return (null)
    }

    getSubContent = async (symId, nestedKey) => {
        showToast("Loading")
        let keyToGet = nestedKey.split('.')
        let elem = this.getElemToModify(this.state.data, keyToGet, 0)
        await global.api.getSymElements(this.state.libId, symId).then(result => {
            let subContent = this.getFormattedResponseWithTypes(result.data)
            if (subContent.length === 0)
                showToast("Nothing found")
            elem.subContent = subContent
        })
    }

    render () {
        return (
            <ScrollView>
                <View style={{padding: 16, backgroundColor: '#dedede'}}>
                    <Text style={styles.topTitle}>{this.state.libName.split("/").pop()} - Tree view</Text>
                </View>
                <View style={{margin: 16}}>
                    {this.state.isLoading
                        ? <ActivityIndicator size="large" color="#7B68EE" />
                        : null
                    }
                    <TreeView data={this.state.data} getSubContent={this.getSubContent} {...this.props}/>
                </View>
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
    cardImage: {
        height: 40,
        width: 40,
        marginRight: 16
    },
})