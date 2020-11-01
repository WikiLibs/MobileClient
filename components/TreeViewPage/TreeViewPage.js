import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TreeView from '../../tools/TreeView'



const data = [
  {
    name: "Pepperoni",
    id: "pepperoni-id",
    subContent: [
      {
        name: "Spicy",
        id: "spicy-id",
        subContent: []
      },
      {
        name: "Regular",
        id: "regular-id",
        subContent: []
      }
    ]
  },
  {
    name: "Chicken",
    id: "chicken-id",
    subContent: [
      {
        name: "Buffalo",
        id: "buffalo-id",
        subContent: [
          {
            name: "Mild",
            id: 'mild-id',
            subContent: [],
          },
          {
            name: "Hot",
            id: 'hot-id',
            subContent: [
              {
                name: 'Jalapeño',
                id: 'jalapeno-id',
                subContent: []
              },
              {
                name: 'Cayenne',
                id: 'cayenne-id',
                subContent: []
              }
            ],
          },
        ]
      },
      {
        name: "BBQ",
        id: 'bbq-id',
        subContent: [],
      }
    ]
  },
]

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
        return (
            <ScrollView style={{margin: 16}}>
                <Text style={styles.topTitle}>{this.state.langName} - Tree view</Text>
                <TreeView data={this.state.data} />
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