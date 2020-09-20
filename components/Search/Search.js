import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { SearchBar } from 'react-native-elements'
import ApiService from '../../ApiService'
import { useQuery } from '../../Utils'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default class Search extends React.Component {
    api = new ApiService();

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
        pageName: "Unknown"
    }

    defaultOption = this.state.langsNames[0];
    defaultValue = "Select a language";

    componentDidMount = async () => {
        await this.api.getLangLibTable().then(langs => {
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
        await this.api.getSymTypes().then(types => this.setState({ types: types }));
        this.refreshData();
    }

    initDropdown = ({ value }) => {
        if (value === "All") {
            this.setState({ langFlag: -1 });
            this.defaultValue = "All"
            this.setState({ symbols: {}, 'page': 1 }, () => this.refreshData());
        } else {
            this.state.langs.forEach(elem => {
                if (value === elem.displayName) {
                    this.setState({ langFlag: elem.id });
                    this.defaultValue = elem.displayName;
                    this.setState({ symbols: {}, 'page': 1 }, () => this.refreshData());
                }
            });
        }
    }

    refreshData = () => {
        var q = useQuery();
        console.log("hey " + this.state.search)
        let query = {
            page: this.state.page,
            count: 10,
            lib: this.state.libFlag === -1 ? null : this.state.libFlag,
            lang: this.state.langFlag === -1 ? null : this.state.langFlag,
            type: this.state.typeFlag === -1 ? null : this.state.typeFlag,
            path: this.state.search
        };
        if (q.lib) {
            this.setState({ search: null, pageName: q.name });
            query.lib = parseInt(q.lib);
        } else if (q.path) {
            this.setState({ search: q.path, pageName: q.path });
            query.path = q.path;
        }
        this.api.searchSymbols(query).then(response => {
            this.sortResultsIntoList(response.data);
        });
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

    renderFooterOld = () => {
        if (Object.keys(this.state.symbols).length === 0 || (!this.state.hasMorePages && this.state.page === 1))
            return;
        if (!this.state.hasMorePages && this.state.page > 1)
            return (
                <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                    Previous page
                </Button>
            )
        if (this.state.page > 1)
            return (
                <div>
                    <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                        Previous page
                    </Button>
                    <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                        Next page
                    </Button>
                </div>
            )
        else
            return (
                <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                    Next page
                </Button>
            )
    }

    renderFooter = () => {
        console.log('yee')
        if (Object.keys(this.state.symbols).length === 0 || (!this.state.hasMorePages && this.state.page === 1)) {
            console.log('exit')
            return
        }
        console.log(!this.state.hasMorePages && this.state.page)
        if (!this.state.hasMorePages && this.state.page > 1)
            return (
                <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                    Previous page
                </Button>
            )
        console.log(this.state.page)
        if (this.state.page > 1)
            return (
                <div>
                    <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                        Previous page
                    </Button>
                    <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                        Next page
                    </Button>
                </div>
            )
        else
            return (
                <Button title="Learn More" />
                /* <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                    Next page
                </Button> */
            )
    }

    getDisplayPath(sym) {
        let upPath = sym.path.substr(sym.path.indexOf('/') + 1);
        return (sym.langName + '/' + upPath);
    }

    renderSymbolListOld = () => {
        return (
            <div>
                {
                    Object.keys(this.state.symbols).map((key) =>
                        <div key={this.state.key + key} className='search-page-results-container'>
                            <div className='search-page-title'>
                                {key[0].toUpperCase() + key.slice(1)}
                                <span className='search-page-title-number'>{this.state.symbols[key].length} result(s)</span>
                            </div>
                            {
                                this.state.symbols[key].map((symbol) =>
                                    <a className='search-page-result-container override-a' key={symbol.id} href={'/symbol?id=' + symbol.id}>
                                        
                                            <div className='search-page-result-title'>
                                                {this.getDisplayPath(symbol)}
                                            </div>
                                        {/* <div className='search-page-card-title'>
                                            <div className='search-page-preview-symbol'>
                                                
                                            </div>
                                        </div> */}
                                        <div className='search-page-result-description'>
                                            Description unavailable yet.
                                        </div>
                                        <div className='search-page-separator' />
                                        <div className='search-page-result-bottom-container'>
                                            <div>Last update : {(new Date(symbol.lastModificationDate)).toLocaleDateString()} (by: {symbol.userName})</div>
                                            <div>Viewed {symbol.views} times(s)</div>
                                        </div>
                                    </a>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    renderSymbolList = () => {
        return (
            <div>
                {
                    Object.keys(this.state.symbols).map((key) =>
                        <div key={this.state.key + key} className='search-page-results-container'>
                            <div className='search-page-title'>
                                {key[0].toUpperCase() + key.slice(1)}
                                <span className='search-page-title-number'>{this.state.symbols[key].length} result(s)</span>
                            </div>
                            {
                                this.state.symbols[key].map((symbol) =>
                                    <a className='search-page-result-container override-a' key={symbol.id} href={'/symbol?id=' + symbol.id}>
                                        
                                            <div className='search-page-result-title'>
                                                {this.getDisplayPath(symbol)}
                                            </div>
                                        {/* <div className='search-page-card-title'>
                                            <div className='search-page-preview-symbol'>
                                                
                                            </div>
                                        </div> */}
                                        <div className='search-page-result-description'>
                                            Description unavailable yet.
                                        </div>
                                        <div className='search-page-separator' />
                                        <div className='search-page-result-bottom-container'>
                                            <div>Last update : {(new Date(symbol.lastModificationDate)).toLocaleDateString()} (by: {symbol.userName})</div>
                                            <div>Viewed {symbol.views} times(s)</div>
                                        </div>
                                    </a>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    updateSearch = (search) => {
        this.setState({ search: search, symbols: {}})
        this.refreshData()
    }

    render = () => {
        console.log("p " + this.state.hasMorePages)
        console.log("pa " + this.state.page)
        return (
            <View>
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
                    <Text>{(!this.state.hasMorePages && this.state.page).toString()}</Text>
                    <Text>{(Object.keys(this.state.symbols).length === 0 || (!this.state.hasMorePages && this.state.page === 1)).toString()}</Text>
                    <Text>{this.state.page.toString()}</Text>
                    <Text>{this.state.hasMorePages.toString()}</Text>
                    <Text>Search : '{this.state.search}'</Text>
                    <Text>OK {this.state.symbols.length}</Text>
                    {this.renderFooter()}
                </View>
            </View>
            /* <div className='search-page-container'>
                
                <div className='search-page-title'>
                    
                    Results for : '{useQuery().lib ? useQuery().name : useQuery().path}'
                    <Dropdown className="search-page-dropdown" options={this.state.langsNames} onChange={this.initDropdown} value={this.defaultOption} placeholder={this.defaultValue} />
                </div>
                {this.renderSymbolList()}
                {this.renderFooter()}
            </div> */
        )
    }

    /*onClickCard = () => {
        props.navigation.navigate("SymbolPage")
    }

    render() {
        return (
            <ScrollView style={{marginLeft: 20, marginRight: 20}}>
                <Text style={styles.titles}>Search</Text>
                <Card onClick={this.onClickCard}>
                    <Card.Title title="symbol_name" subtitle="library_name" left={LeftContent} />
                    <Card.Content>
                        <Paragraph>symbol_description_long</Paragraph>
                    </Card.Content>
                    <View style={styles.separator}></View>
                    <Card.Content>
                        <Paragraph>Last update : dd/mm/yyyy (by: user)</Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        )
    }*/
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
        marginLeft: 16
    },
    resultsName: {
        color: "#3E3E3E",
        fontStyle: "italic"
    },


    updated: {
      fontStyle: "italic",
      color: "#3E3E3E",
      marginBottom: 20
    },
    titles: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 40,
      marginBottom: 10
    },
    mainContent: {
        marginLeft: 20,
        marginRight: 20
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
    separator: {
        height: 1,
        backgroundColor: '#EBEBEB',
        margin: 16
    }
  })