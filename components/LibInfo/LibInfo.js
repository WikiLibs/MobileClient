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
        tmpData: `
Boost provides free peer-reviewed portable C++ source libraries.

We emphasize libraries that work well with the C++ Standard Library. Boost libraries are intended to be widely useful, and usable across a broad spectrum of applications. The [Boost license](https://www.boost.org/users/license.html) encourages the use of Boost libraries for all users with minimal restrictions.

We aim to establish "existing practice" and provide reference implementations so that Boost libraries are suitable for eventual standardization. Beginning with the ten Boost Libraries included in the Library Technical Report ([TR1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1745.pdf)) and continuing with every release of the ISO standard for C++ since 2011, the [C++ Standards Committee](http://www.open-std.org/jtc1/sc22/wg21/) has continued to rely on Boost as a valuable source for additions to the Standard C++ Library.

# Get Boost

The most reliable way to get a copy of Boost is to download a distribution from [SourceForge](https://www.boost.org/users/history/version_1_73_0.html):

## Download

[Boost download](https://www.boost.org/users/history/version_1_73_0.html "Unix Boost 1.73.0")

## Install

In the directory where you want to put the Boost installation, execute:

\`tar --bzip2 -xf /path/to/boost_1_73_0.tar.bz2\`

<note>
Note title

Other Packages: RedHat, Debian, and other distribution packagers supply Boost library packages, however you may need to adapt these instructions if you use third-party packages, because their creators usually choose to break Boost up into several packages, reorganize the directory structure of the Boost distribution, and/or rename the library binaries.1 If you have any trouble, we suggest using an official Boost distribution from SourceForge.
</note>

# The boost distribution

This is a sketch of the resulting directory structure:

\`boost_1_73_0/ .................The “boost root directory”\nindex.htm .........A copy of www.boost.org starts here\nboost/ .........................All Boost Header files\n\nlibs/ ............Tests, .cpps, docs, etc., by library\nindex.html ........Library documentation starts here\nalgorithm/\nany/\narray/\n…more libraries…\nstatus/ .........................Boost-wide test suite\ntools/ ...........Utilities, e.g. Boost.Build, quickbook, bcp\nmore/ ..........................Policy documents, etc.\ndoc/ ...............A subset of all Boost library docs\`

<note>
See the Linux and macOS platform docs for a troubleshooting guide and more information about building your projects for Unix-like systems.
</note>

`,
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
        this.setState({statementList: parseMarkdown(this.state.tmpData)})
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
                <View style={{padding: 16, backgroundColor: '#dedede'}}>
                    <Text style={styles.topTitle}>{this.state.libName.split("/").pop()} - Informations</Text>
                </View>
                <View style={{margin: 16}}>
                    {this.state.statementList && this.state.statementList.map(statement =>
                        this.renderStatement(statement)
                    )}
                    {/* <Text>Work in progress</Text> */}
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