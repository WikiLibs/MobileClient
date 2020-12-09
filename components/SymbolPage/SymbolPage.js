import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import CodeBox from './../../tools/CodeBox'
import showToast from './../../tools/Toast'

export default class SymbolPage extends React.Component {
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
        commentId: 0,
        tmpComment: ""
    }

    componentDidMount = async () => {
        let symbolId = this.props.route.params.params.symbolId
        /* let listExample = await global.api.getExamples(symbolId) */
        this.setState({symbolId: symbolId});

        /* let mapIdPseudo = {};
        let mapComments = {};
        let comments = {};
        listExample.data.forEach(elem => {
            global.api.getUser(elem.userId).then(response => {mapIdPseudo[elem.userId] = response.data.pseudo});
            global.api.getComments(elem.id, 1).then(response => {
                mapComments[elem.id] = response.data
                response.data.data.map(comment => {
                    global.api.getUser(comment.userId).then(response => {mapIdPseudo[comment.userId] = response.data.pseudo})
                })
            });
            comments[elem.id] = "";
        })

        this.setState({mapIdPseudo: mapIdPseudo});
        this.setState({listExample: listExample.data});
        this.setState({mapComments: mapComments});
        this.setState({comment: comments}); */

        await this.getExamples(symbolId)
        global.api.getSymbolById(symbolId).then(response => { this.setState(response.data); });
    }

    getExamples = async (symbolId) => {
        let listExample = await global.api.getExamples(symbolId)
        let mapIdPseudo = {};
        let mapComments = {};
        let comments = {};
        listExample.data.forEach(elem => {
            global.api.getUser(elem.userId).then(response => {mapIdPseudo[elem.userId] = response.data.pseudo});
            global.api.getComments(elem.id, 1).then(response => {
                mapComments[elem.id] = response.data
                response.data.data.map(comment => {
                    global.api.getUser(comment.userId).then(response => {mapIdPseudo[comment.userId] = response.data.pseudo})
                })
            });
            comments[elem.id] = "";
        })

        this.setState({mapIdPseudo: mapIdPseudo});
        this.setState({listExample: listExample.data});
        this.setState({mapComments: mapComments});
        this.setState({comment: comments});
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

    renderPrototype = (prototype, language) => {
        return (
            <View>
                <Text style={styles.titles}>Prototype</Text>
                <CodeBox 
                    code={prototype.prototype}
                    language={this.state.lang.name}
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

    renderExceptions = (prototype) => {
        if (prototype.exceptions.length === 0)
            return null
        return (
            <View>
                <Text style={styles.titles}>Exceptions(s)</Text>
                {prototype.exceptions.map((exception, index) =>
                    <View>
                        <Text style={styles.parameter}>{exception.ref.path}</Text>
                        <Text style={styles.parameterDescription}>{exception.description}</Text>
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

    onPressLogin = () => {
        this.props.navigation.navigate("Account")
    }

    onUpdateTmpCommentChange = (event) => {
        this.setState({tmpComment: event});
    }

    onPressSend = (exampleId, comment) => {
        global.api.postComment(exampleId, comment)
            .then((Response) => {
                this.setState({
                    tmpComment: ""
                })
                showToast("Successfuly posted message")
                this.getExamples(this.state.symbolId)
            })
            .catch(error => {
                console.log(error)
            });
    }

    renderComments = (exampleId) => {
        if (!this.state.mapComments[exampleId])
            return
        return (
            <View>
                {this.state.mapComments[exampleId].data.length > 0
                ? this.state.mapComments[exampleId].data.map((comment, index) =>
                    <View>
                        {index !== 0
                            ? <View style={styles.separatorCommentariesIndividual}/>
                            : null
                        }
                        <Text>{comment.data}</Text>
                        <View style={styles.exampleCommentairesCommentaryContainer}>
                            <Text style={styles.exampleCommentairesCommentary}>{this.state.mapIdPseudo[comment.userId]}</Text>
                            <Text style={styles.exampleCommentairesCommentaryDate}> - {(new Date(comment.creationDate)).toLocaleDateString()}</Text>
                        </View>
                    </View>
                )
                : <Text>No comments yet.</Text>
                }
            </View>
        )
    }

    onPressUpvote = (example) => {
        if (example.hasVoted) {
            showToast("Already voted")
            return
        }
        global.api.upvoteExample(example.id)
            .then(() => {
                showToast("Successfuly upvoted")
                this.getExamples(this.state.symbolId)
            })
            .catch(() => {
                showToast("Error happened while upvoting")
            });
    }

    onPressDownvote = (example) => {
        if (example.hasVoted) {
            showToast("Already voted")
            return
        }
        global.api.downvoteExample(example.id)
            .then(() => {
                showToast("Successfuly downvoted")
                this.getExamples(this.state.symbolId)
            })
            .catch(() => {
                showToast("Error happened while downvoting")
            });
    }

    renderUpvotes = (example) => {
        return (
            <View style={styles.upvoteContainer}>
                <Text>{example.voteCount} points</Text>
                {typeof example.hasVoted === 'boolean'
                    ? <View style={styles.upvoteButtonsContainer}>
                        <IconButton
                            icon="arrow-up"
                            mode="contained"
                            onPress={() => this.onPressUpvote(example)}
                            color={example.hasVoted ? "#dedede" : "#81D89F"}
                            style={styles.buttonVote}
                        />
                        <IconButton
                            icon="arrow-down"
                            mode="contained"
                            onPress={() => this.onPressDownvote(example)}
                            color={example.hasVoted ? "#dedede" : "#F85B5B"}
                            style={styles.buttonVote}
                        />
                    </View>
                    : null
                }
                
            </View>
        )
    }

    renderExample = (example) => {
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleDescription}>{example.description}</Text>
                <View style={styles.separatorDescription}/>
                <CodeBox
                    code={this.getExample(example.code)}
                    language={this.state.lang ? this.state.lang.name : 'C'}
                />
                <Text style={styles.exampleModification}>Created at: {this.state.mapIdPseudo[example.userId]} {(new Date(example.creationDate)).toLocaleDateString()}</Text>
                <View style={styles.separatorCommentaries}/>
                {this.renderUpvotes(example)}
                <View style={styles.separatorCommentaries}/>
                <Text style={styles.exampleCommentariesTitle}>Comments</Text>
                {this.renderComments(example.id)}
                <View style={styles.separatorCommentariesInput}/>
                {global.api.token
                    ? <View style={styles.inputComment}>
                        <TextInput
                            label=""
                            placeholder="Input your message"
                            mode="outlined"
                            selectionColor="#7B68EE"
                            style={styles.commentInput}
                            onChangeText={this.onUpdateTmpCommentChange}
                            value={this.state.tmpComment}
                        />
                        <IconButton
                            icon="send"
                            mode="contained"
                            onPress={() => this.onPressSend(example.id, this.state.tmpComment)}
                            color="#7B68EE"
                            style={styles.buttonSend}
                        >
                            SEND
                        </IconButton>
                    </View>
                    : <View>
                        <Text style={{marginBottom: 8}}>You should login to post comments</Text>
                        <Button
                            mode="contained"
                            onPress={this.onPressLogin}
                            contentStyle={styles.buttonLogin}
                        >
                            LOGIN
                        </Button>
                    </View>
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
            <ScrollView>
                <View style={{backgroundColor: '#dedede'}}>
                    <View style={styles.titlesContainer}>
                        <Text style={styles.topTitle}>{this.getSymbolName()}</Text>
                        <Text style={styles.topTitleBottom}>{this.getSymbolType()}</Text>
                        <View style={styles.separator}/>
                        <Text style={styles.subtitle}>{this.getSymbolLib()}</Text>
                        <Text style={styles.subtitle}>Last updated: {(new Date(this.state.lastModificationDate)).toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={{marginLeft: 20, marginRight: 20}}>
                    {this.state.prototypes.map((prototype, index) =>
                        <View>
                            {this.renderPrototype(prototype)}
                            {this.renderDescription(prototype)}
                            {this.renderParameters(prototype)}
                            {this.renderReturns(prototype)}
                            {this.renderExceptions(prototype)}
                            {(index !== (this.state.prototypes.length - 1))
                                ? <View style={styles.separatorColor}/>
                                : null
                            }
                        </View>
                    )}
                    <View style={styles.separatorBig} />
                    {this.renderExamples()}
                    <View style={styles.separatorBig} />
                </View>
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
    titlesContainer: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,
        paddingTop: 20,
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    topTitle: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 30
    },
    topTitleBottom: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16
      },
    titles: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 30,
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
        borderColor: "#dedede",
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 8,
        padding: 16
    },
    exampleDescription: {
        marginBottom: 8,
        fontStyle: 'italic',
        fontSize: 16
    },
    exampleModification: {
        marginTop: 16,
        fontStyle: 'italic',
        fontSize: 12,
        color: "#3E3E3E"
    },
    upvoteContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -8,
        marginBottom: -8
    },
    upvoteButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    separatorDescription: {
        height: 1,
        backgroundColor: '#EBEBEB',
        marginBottom: 8
    },
    separatorCommentaries: {
        height: 1,
        backgroundColor: '#dedede',
        marginBottom: 16,
        marginTop: 16
    },
    separatorCommentariesInput: {
        height: 1,
        backgroundColor: '#dedede',
        marginBottom: 8,
        marginTop: 8
    },
    exampleCommentariesTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8
    },
    separatorCommentariesIndividual: {
        height: 1,
        backgroundColor: '#EBEBEB',
        margin: 8
    },
    exampleCommentairesCommentaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    exampleCommentairesCommentary: {
        color: "#4C3DA8",
        fontSize: 12
    },
    exampleCommentairesCommentaryDate: {
        color: "#3E3E3E",
        fontSize: 12
    },
    buttonLogin: {
        backgroundColor: '#7B68EE',
        height: 32
    },
    inputComment: {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        alignItems: 'flex-end',
        marginTop: 10
    },
    commentInput: {
        flexGrow: 1,
        height: 30,
        marginRight: 16
    },
    buttonSend: {
        height: 32,
        margin: 0
    },
    buttonVote: {
        height: 16,
        width: 16,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 0,
        marginBottom: 0
    }
  })