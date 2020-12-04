import * as React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native-paper'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { parseMarkdown, Statement } from '../../MiniMarkdownParser.js'
import CodeBox from '../../tools/CodeBox'

export default class LibInfo extends React.Component {
    state = {
        libId: 0,
        libName: '',
        langId: 0,
        langName: '',
        notAvailable: false,
        statementList: []
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
            langName: langName
        })

        await global.api.getLibInfo(libId)
            .then((response) => {
                if (!response.data.description)
                    this.setState({notAvailable: true})
                else
                    this.setState({statementList: parseMarkdown(response.data.description)})
            })
            .catch(error => {
                console.log(error)
            })
        
    }

    onPressUrl = (url) => {
        WebBrowser.openBrowserAsync(url)
    }

    customButton = (statement) => 
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.buttonContainer} onPress={() => {this.onPressUrl(statement.link)}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {statement.title}
                </Text>
                {
                    statement.description &&
                    <Text style={{color: 'white', fontStyle: 'italic'}}>{statement.description}</Text>
                }
            </Text>
        </View>

    renderSubTitle = (statement) =>
        <Text style={styles.subTitle}>{statement.data}</Text>

    renderTitle = (statement) => 
        <Text style={styles.title}>{statement.data}</Text>

    renderTerminal = (statement) =>
        <View style={{marginTop: 8, marginBottom: 8}}>
            <CodeBox 
                code={statement.data}
                isTerminal
            />
        </View>

    renderButtonWithDesc = (statement) =>
        this.customButton(statement)

    renderButtonWithoutDesc = (statement) =>
        this.customButton(statement)

    renderSmallNote = (statement) =>
        <View style={styles.smallNoteContainer}>
            {this.renderTextBody(statement)}
        </View>

    renderNote = (statement) => 
        <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{statement.title}</Text>
            {this.renderTextBody(statement)}
        </View>

    renderTextBody = (statement) =>
        <Text style={{marginBottom: 8, marginTop: 8}}>
            {statement.tokens.map((token, index) =>
                token.type === 0
                    ? <Text>
                        {index === 0 ? '    ' : ''}{token.data}
                    </Text>
                    : <Text style={styles.url} onPress={() => {this.onPressUrl(token.link)}}>
                        {token.title}
                    </Text>
                
            )}
        </Text>

    renderStatement = (statement) => {
        switch (statement.type) {
            case Statement.SubTitle:
                return this.renderSubTitle(statement)
            case Statement.Title:
                return this.renderTitle(statement)
            case Statement.Terminal:
                return this.renderTerminal(statement)
            case Statement.ButtonWithDesc:
                return this.renderButtonWithDesc(statement)
            case Statement.ButtonWithoutDesc:
                return this.renderButtonWithoutDesc(statement)
            case Statement.SmallNote:
                return this.renderSmallNote(statement)
            case Statement.Note:
                return this.renderNote(statement)
            case Statement.TextBody:
                return this.renderTextBody(statement)
        }
    }

    render () {
        return (
            <ScrollView>
                <View style={{margin: 16, marginTop: 0}}>
                    {this.state.statementList && this.state.statementList.map(statement =>
                        this.renderStatement(statement)
                    )}
                    {this.state.notAvailable && 
                        <Text style={{marginTop: 16}}>
                            No informations available for {this.state.libName.split("/").pop()}
                        </Text>
                    }
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
    subTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
        marginTop: 8
    },
    title: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 16,
        marginBottom: 8
    },
    url: {
        color: '#7B68EE',
        fontStyle: 'italic'
    },
    buttonContainer: {
        padding: 8, 
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#7B68EE', 
        borderRadius: 4, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    noteContainer: {
        borderRadius: 4,
        borderColor: '#7B68EE',
        borderWidth: 1,
        borderLeftWidth: 3,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 8,
        marginBottom: 8
    },
    noteTitle: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        marginBottom: 8
    },
    smallNoteContainer: {
        borderRadius: 4,
        borderColor: '#7B68EE',
        borderWidth: 1,
        borderLeftWidth: 3,
        backgroundColor: '#CAC3F8',
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 8,
        marginBottom: 8
    }
})