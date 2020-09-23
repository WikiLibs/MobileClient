import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import CodeBox from './../../tools/CodeBox'
import ApiService from '../../ApiService'

export default class SymbolPage extends React.Component {
    api = new ApiService();

    state = {
        userId: null,
        date: null,
        lang: null,
        type: null,
        path: null,
        prototypes: [],
        symbols: [],
        code: "Write an example...", 
        description: "", 
        message: "" ,
        listExample: [],
        symbolId: 0,
        pseudoExample: "",
        mapIdPseudo: {},
        mapComments: {},
        comment: {},
        exampleId: 0,
        commentId: 0
    }

    componentDidMount = async () => {
        let symbolId = this.props.route.params.params.symbolId
        let listExample = await this.api.getExamples(symbolId)
        this.setState({symbolId: symbolId});

        let mapIdPseudo = {};
        let mapComments = {};
        let comments = {};
        listExample.data.forEach(elem => {
            this.api.getUser(elem.userId).then(response => {mapIdPseudo[elem.userId] = response.data.pseudo});
            this.api.getComments(elem.id, 1).then(response => {mapComments[elem.id] = response.data});
            comments[elem.id] = "";
        })

        this.setState({mapIdPseudo: mapIdPseudo});
        this.setState({listExample: listExample.data});
        this.setState({mapComments: mapComments});
        this.setState({comment: comments});

        this.api.getSymbolById(symbolId).then(response => { this.setState(response.data); });
    }

    getSymbolType = () => {
        if (this.state.type)
            return this.state.type.displayName
        return ""
    }
    
    getSymbolName = () => {
        var path = this.state.path;
        if (path) {
            var arr = path.split('/');
            if (arr.length <= 0)
                return (null)
            return (arr[arr.length - 1])
        }
        return (null)
    }

    getSymbolLib = () => {
        var path = this.state.path;
        if (path) {
            var arr = path.split('/');
            if (arr.length < 2)
                return (null)
            return (arr[1])
        }
        return (null)
    }

    searchStringInParameters = (string, array) => {
        for (let i = 0; i < array.parameters.length; i++) {
            if (array.parameters[i].prototype === string)
                return true
        }
        return false
    }

    renderPrototype = (prototype) => {
        return (
            <View>
                <Text style={styles.titles}>Prototype</Text>
                <CodeBox 
                    code={prototype.prototype}
                />
            </View>
        )
    }

    renderDescription = (prototype) => {
        if (!prototype.description)
            return null
        return (
            <View>
                <Text style={styles.titles}>Description</Text>
                <Text style={styles.mainContent}>{prototype.description}</Text>
            </View>
        )
    }

    renderParameters = (prototype) => {
        if ((!this.searchStringInParameters('return', prototype) && prototype.parameters.length === 0) || prototype.parameters[0].prototype === 'return')
            return null
        return (
            <View>
                <Text style={styles.titles}>Parameter(s)</Text>
                {prototype.parameters.map((parameter, index) =>
                    <View>
                        {parameter.prototype !== 'return'
                            ? <View>
                                <Text style={styles.parameter}>{parameter.prototype}</Text>
                                <Text style={styles.parameterDescription}>{parameter.description}</Text>
                            </View>
                            : null
                        }
                    </View>
                )}
            </View>
        )
    }

    renderReturns = (prototype) => {
        if (!this.searchStringInParameters('return', prototype))
            return null
        return (
            <View>
                <Text style={styles.titles}>Return value(s)</Text>
                {prototype.parameters.map((parameter, index) =>
                    <View>
                        {parameter.prototype === 'return'
                            ? <View>
                                <Text style={styles.parameter}>{parameter.prototype}</Text>
                                <Text style={styles.parameterDescription}>{parameter.description}</Text>
                            </View>
                            : null
                        }
                    </View>
                )}
            </View>
        )
    }

    getExample = (exampleTab) => {
        let exampleString = ''
        let indent = ''

        for (let i = 0; i < exampleTab.length; i++) {
            if (i !== 0)
                exampleString += '\n'
            if (exampleTab[i].data.includes('}'))
                indent -= '   '
            indent = indent === 0 ? '' : indent
            exampleString += indent + exampleTab[i].data
            if (exampleTab[i].data.includes('{'))
                indent += '    '
        }
        return exampleString
    }

    renderExample = (example) => {
        let list = [];
        let comments = [];
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleDescription}>{example.description}</Text>
                <View style={styles.separatorDescription}/>
                <CodeBox
                    code={this.getExample(example.code)}
                />
                <Text style={styles.exampleModification}>Last modification: {this.state.mapIdPseudo[example.userId]} {example.lastModificationDate}</Text>
                <View style={styles.separatorCommentaries}/>
                <Text style={styles.exampleCommentariesTitle}>Comments</Text>
                {Object.keys(this.state.mapComments).length > 0
                    ? this.state.mapComments[example.id].data.map((comment, index) =>
                        <View>
                            {index !== 0
                                ? <View style={styles.separatorCommentariesIndividual}/>
                                : null
                            }
                            <View style={styles.exampleCommentairesCommentaryContainer}>
                                <Text style={styles.exampleCommentaries}>{comment.data}</Text>
                                <Text style={styles.exampleCommentairesCommentary}>-   {this.state.mapIdPseudo[comment.userId]}</Text>
                                <Text style={styles.exampleCommentairesCommentaryDate}>   {(new Date(comment.creationDate)).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    )
                    : <Text>No comments yet.</Text>
                }
            </View>
        )
    }
    
    renderExamples = () => {
        if (this.state.listExample.length === 0)
            return (
                <View>
                    <Text style={styles.titles}>Examples</Text>
                    <Text>No examples available yet. Come back later !</Text>
                </View>
            )
        return (
            <View>
                <Text style={styles.titles}>Examples</Text>
                {this.state.listExample.map((example, index) =>
                    <View>
                        {this.renderExample(example)}
                    </View>
                )}
            </View>
        )
    }

    render () {
        return (
            <ScrollView style={{marginLeft: 20, marginRight: 20}}>
                <Text style={styles.titles}>{this.getSymbolType()} | {this.getSymbolName()}</Text>
                <Text style={styles.subtitle}>{this.getSymbolLib()}</Text>
                <Text style={styles.subtitle}>Last updated: {this.state.lastModificationDate}</Text>

                {this.state.prototypes.map((prototype, index) =>
                    <View>
                        {this.renderPrototype(prototype)}
                        {this.renderDescription(prototype)}
                        {this.renderParameters(prototype)}
                        {this.renderReturns(prototype)}
                        {(index !== (this.state.prototypes.length - 1))
                            ? <View style={styles.separatorColor}/>
                            : null
                        }
                    </View>
                )}
                <View style={styles.separatorBig} />
                {this.renderExamples()}
                <View style={styles.separatorBig} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    updated: {
      fontStyle: "italic",
      color: "#3E3E3E",
      marginBottom: 20
    },
    titles: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 40,
      marginBottom: 10
    },
    subtitle: {
        fontStyle: "italic",
        color: "#3E3E3E"
    },
    separator: {
        height: 16,
        opacity: 0
    },
    separatorSmall: {
        height: 8,
        opacity: 0
    },
    separatorBig: {
        height: 32,
        opacity: 0
    },
    mainContent: {
        marginLeft: 20,
        marginRight: 20
    },
    parameter: {
        marginLeft: 20,
        marginRight: 20,
        color: '#4C3DA8'
    },
    parameterDescription: {
        marginLeft: 40
    },
    mainContentLink: {
        marginLeft: 20,
        marginRight: 20,
        fontStyle: "italic",
        color: '#4C3DA8'
    },
    subContent: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
      marginTop: 10
    },
    separatorColor: {
        height: 1,
        backgroundColor: '#cccccc',
        margin: 16,
        marginTop: 32
    },
    exampleContainer: {
        borderColor: "#EBEBEB",
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 8,
        padding: 16
    },
    exampleDescription: {
        marginBottom: 8
    },
    exampleModification: {
        marginTop: 16,
        fontStyle: 'italic',
        fontSize: 12,
        color: "#3E3E3E"
    },
    separatorDescription: {
        height: 1,
        backgroundColor: '#EBEBEB',
        marginBottom: 8
    },
    separatorCommentaries: {
        height: 1,
        backgroundColor: '#EBEBEB',
        marginBottom: 8,
        marginTop: 8
    },
    exampleCommentariesTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        marginBottom: 8
    },
    exampleCommentaries: {
        marginLeft: 8,
        marginRight: 8
    },
    separatorCommentariesIndividual: {
        height: 1,
        backgroundColor: '#EBEBEB',
        margin: 8
    },
    exampleCommentairesCommentaryContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    exampleCommentairesCommentary: {
        color: "#4C3DA8"
    },
    exampleCommentairesCommentaryDate: {
        color: "#3E3E3E"
    }
  })