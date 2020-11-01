import * as React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import TreeView from '../../tools/TreeView'

export default class TreeViewPage extends React.Component {
    state = {
        langId: 0,
        langName: '',
        data: []
    }

    componentDidMount = async () => {
        let langId = this.props.route.params.params.langId
        this.setState({
            langId: this.props.route.params.params.langId,
            langName: this.props.route.params.params.langName
        })

        let data = []
        let baseLibContents = []
        await global.api.getSymTypes().then(result => {
            let tmpTypes = []
            result.forEach(type => {
                tmpTypes.push(type.displayName)
            })
            tmpTypes = [...new Set(tmpTypes)].sort()
            tmpTypes.forEach(type => {
                baseLibContents.push({
                    id: type,
                    name: type,
                    subContent: []
                })
            })
        })
        await global.api.getLibs(langId).then(result => {
            let libs = result.data.data

            libs.forEach(lib => {
                let libContents = JSON.parse(JSON.stringify(baseLibContents))
                global.api.getLibElements(lib.id).then(result => {
                    result.data.forEach(elem => {
                        libContents.forEach(typeContents => {
                            if (typeContents.name === elem.type)
                                typeContents.subContent.push({
                                    id: elem.id,
                                    name: elem.firstPrototype,
                                    subContent: []
                                })
                        })
                    })
                })
                data.push({
                    name: lib.name.split("/").pop(),
                    id: lib.id,
                    subContent: libContents
                })
            })
            this.setState({data: data})
        })
    }

    render () {
        console.log(this.props.navigation)
        return (
            <ScrollView style={{margin: 16}}>
                <Text style={styles.topTitle}>{this.state.langName} - Tree view</Text>
                <TreeView data={this.state.data} {...this.props}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    topTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,
        marginBottom: 16
    },
})