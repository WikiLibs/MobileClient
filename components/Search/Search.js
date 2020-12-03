import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { SearchBar } from 'react-native-elements'
import CustomButton from './../../tools/CustomButton'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default class Search extends React.Component {

    state = {
        data: null,
        hasMorePages: false,
        page: 1,
        symbols: {},
        key: "ID#",
        langs: [],
        langsNames: [],
        types: [],
        libMap: null,
        results: [],
        langMap: {},
        libFlag: -1,
        langFlag: -1,
        typeFlag: -1,
        search: "",
        pageName: "Unknown",
        filterLanguage: "",
        languages: []
    }

    componentDidMount = async () => {
        await global.api.getLangLibTable().then(langs => {
            let map = {};
            let tab = [];
            tab[0] = "All";
            map[-1] = [];
            langs.forEach(elem => {
                map[elem.id] = elem.libs;
                tab.push(elem.displayName);
            });
            this.setState({ langs: langs, libMap: map, langsNames: tab });
        });
        await global.api.getSymTypes().then(types => this.setState({ types: types }));
    }

    refreshData = () => {
        let query = {
            page: this.state.page,
            count: 10,
            lib: this.state.libFlag === -1 ? null : this.state.libFlag,
            lang: this.state.langFlag === -1 ? null : this.state.langFlag,
            type: this.state.typeFlag === -1 ? null : this.state.typeFlag,
            path: this.state.search
        }
        global.api.searchSymbols(query).then(response => {
            this.sortResultsIntoList(response.data);
        })
    }

    handleNext = () => {
        this.setState({ symbols: {}, 'page': this.state.page + 1 }, () => this.refreshData());
    }

    handlePrev = () => {
        this.setState({ symbols: {}, 'page': this.state.page - 1 }, () => this.refreshData());
    }

    sortResultsIntoList = (data) => {
        let symbolsTemp = data.data
        let symbolsState = this.state.symbols

        symbolsTemp.forEach((sym) => {
            if (!(sym.typeName in symbolsState))
                symbolsState[sym.typeName] = []
            symbolsState[sym.typeName].push(sym)
        })
        this.setState({
            symbols: symbolsState,
            hasMorePages: data.hasMorePages
        })
    }

    getLanguages = () => {
        let tab = []
        this.state.langs.forEach(elem => {
            tab += {label: elem.displayName, value: elem.id}
        })
        this.setState({languages: tab})
    }

    renderFooter = () => {
        const isPrevEnabled = () => {
            if (this.state.page > 1 && this.state.search.length > 0)
                return true
            return false
        }

        const isNextEnabled = () => {
            if (this.state.hasMorePages && this.state.search.length > 0)
                return true
            return false
        }

        return (
            <View style={styles.footerContainer}>
                <CustomButton 
                    title="Prev" 
                    onClick={this.handlePrev} 
                    isEnabled={isPrevEnabled()}
                    icon="chevron-left" />
                <CustomButton 
                    title="Next" 
                    onClick={this.handleNext} 
                    isEnabled={isNextEnabled()}
                    icon="chevron-right" />
            </View>
        )
    }

    getDisplayPath(sym) {
        let upPath = sym.path.substr(sym.path.indexOf('/') + 1);
        return (sym.langName + '/' + upPath);
    }

    getSymbolName = (symbolFullPath) => {
        let symbolName = symbolFullPath

        symbolName = symbolName.substring(symbolName.lastIndexOf("/") + 1, symbolName.length);

        return symbolName
    }

    getSymbolPath = (symbolFullPath) => {
        let symbolName = symbolFullPath

        symbolName = symbolName.substring(0, symbolName.lastIndexOf("/"));

        return symbolName
    }

    getLibName = (path) => {
        let splitedPath = path.split('/')

        return splitedPath[1]
    }

    getSubtitle = (path) => {
        let splitedPath = path.split('/')

        return (splitedPath[0] + ' - ' + splitedPath[1])
    }

    onClickCard = (symbolId) => () => {
        this.props.navigation.navigate("SymbolPage", {
            params: {
                symbolId: symbolId
            }
        })
    }

    renderSymbolList = () => {
        return (
            <View style={styles.symbolListContainer}>
                {Object.keys(this.state.symbols).map((key) =>
                    <View>
                        <View style={styles.symbolTypeTitleContainer}>
                            <Text style={styles.symbolTypeTitle}>{key[0].toUpperCase() + key.slice(1)}</Text>
                            <Text style={styles.symbolTypeSubtitle}>{this.state.symbols[key].length} result(s)</Text>
                        </View>
                        {this.state.symbols[key].map((symbol) =>
                            <TouchableOpacity onPress={this.onClickCard(symbol.id)}>
                                <Card style={styles.cardContainer}>
                                    <Card.Title title={this.getSymbolName(this.getDisplayPath(symbol))} titleStyle={{color: '#4C3DA8'}} subtitle={this.getSubtitle(symbol.path)} />
                                    <View style={styles.separator}></View>
                                    <Card.Content>
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontSize: 10, color: '#0000008A'}}>Last update : {(new Date(symbol.lastModificationDate)).toLocaleDateString()} (by: {symbol.userName})</Text>
                                            <Text style={{fontSize: 10, color: '#0000008A'}}>Viewed {symbol.views} time(s)</Text>
                                        </View>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        )
    }

    updateSearch = (search) => {
        this.setState({ search: search, symbols: {}}, () => {
            if (search.length > 0)
                this.refreshData()
            else
                this.setState({hasMorePages: false})
        })
    }

    render = () => {
        return (
            <ScrollView>
                <SearchBar
                    inputStyle={styles.searchBarInput}
                    inputContainerStyle={styles.searchBarInputContainer}
                    containerStyle={styles.searchBarContainer}
                    placeholder="Search here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <View style={styles.resultsContainer}>
                    {this.state.search
                        ? <Text style={styles.resultsName}>Results for : {this.state.search}</Text>
                        : null
                    }
                    {this.renderSymbolList()}
                    {this.state.search.length > 0
                        ? this.renderFooter()
                        : null
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    searchBarInput: {
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: "#7B68EE",
        borderWidth: 2,
        paddingLeft: 10
    },
    searchBarInputContainer: {
        backgroundColor: "transparent"
    },
    searchBarContainer: {
        backgroundColor: "transparent",
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    resultsContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 32
    },
    resultsName: {
        color: "#3E3E3E",
        fontStyle: "italic",
        marginBottom: 16
    },
    footerContainer: {
        marginTop: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    symbolListContainer: {
    },
    symbolTypeTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16
    },
    symbolTypeTitle: {
        color: "#4C3DA8",
        fontWeight: "bold",
        fontSize: 21,
        marginRight: 16
    },
    symbolTypeSubtitle: {
        color: "#3E3E3E",
        fontStyle: "italic"
    },
    cardContainer: {
        marginBottom: 16
    },
    filterContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    filterLabel: {
        marginRight: 16
    },
    filterSelect: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: "#7B68EE",
        borderWidth: 1,
        paddingLeft: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        margin: 8
    }
  })