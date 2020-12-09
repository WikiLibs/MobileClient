import * as React from 'react'
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default class TreeView extends React.Component {
    state = {
        selectedOptions: {},
        currentPath: ""
    }
    
    render = () => {
        return (
            <View>
                {this.props.data
                    ? <TreeList 
                        options={this.props.data}
                        onChange={(selectedOptions) => this.setState({selectedOptions})}
                        getSubContent={this.props.getSubContent}
                        selectedOptions={this.state.selectedOptions} 
                        level={0}
                        navigation={this.props.navigation}
                        currentPath={this.state.currentPath}
                    />
                    : <Text>Could not found data</Text>
                }
            </View>
        )
    }
}

const TreeList = ({
    options,
    onChange,
    getSubContent,
    selectedOptions,
    level,
    navigation,
    currentPath
}) => {
    const couldBeNested = (path) => {
        let pathArray = path.split('.')
        if (pathArray.length >= 2 && pathArray.length % 2 === 0) {
            let type = pathArray[pathArray.length - 2]
            switch (type) {
                case "class":
                case "union":
                case "struct":
                    return true
                default:
                    return false
            }
        }
        return false
    }

    const handleElementClicked = async (option) => {
        let currentTmpPath = currentPath + '.' + option.name
        let canBeNested = couldBeNested(currentTmpPath)

        if (level >= 1 && !option.subContent && canBeNested) {
            await getSubContent(option.id, currentTmpPath)
        } else if (level >= 1 && level % 2 == 1 && ((option.subContent && !option.subContent.length) || !canBeNested)) {
            navigation.navigate('SymbolPage', {
                params: {
                    symbolId: option.id
                }
            })
        } if (selectedOptions[option.id]){ // Is currently selected
            delete selectedOptions[option.id]; // Remove selected key from options list
        } else { // is not currently selected
            selectedOptions[option.id] = {} // Add selected key to optionsList
        }
        onChange(selectedOptions) // call onChange function given by parent
    }
    
    const handleSubOptionsListChange = (optionId, subSelections) => {
        selectedOptions[optionId] = subSelections;
        onChange(selectedOptions);
    }

    /* const getIndicator = (isSelected, hasNext) => { */
    const getIndicator = (option, selectedOptions) => {
        let isSelected = selectedOptions[option.id]
        let hasNext = option.subContent && option.subContent.length > 0
        
        if (option.isLoading)
            return <View style={{margin: 6}}><ActivityIndicator size="small" color="#7B68EE" /></View>
        else if (isSelected && hasNext)
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0'}} size={32} icon='chevron-down' />
        else if (hasNext)
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0'}} size={32} icon='chevron-right' />
        else
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0', margin: 8}} size={16} icon='record' />
    }
    
    return (
        <View>
            {options.map(option => (
                <View>
                    <TouchableOpacity onPress={() => handleElementClicked(option, level)}>
                        <View style={{height: 'auto', display: 'flex', flexDirection: 'row', marginLeft: level * 32, marginBottom: 8, alignItems: 'center'}}>
                            {getIndicator(option, selectedOptions)}
                            <Text style={{flex: 1}}>{option.name}</Text>
                        </View>
                    </TouchableOpacity>
                    {(option.subContent && option.subContent.length > 0 && selectedOptions[option.id]) &&
                        <TreeList
                            options={option.subContent}
                            onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
                            getSubContent={getSubContent}
                            selectedOptions={selectedOptions[option.id]} 
                            level={level + 1}
                            navigation={navigation}
                            currentPath={currentPath.length === 0 ? option.name : currentPath + '.' + option.name}
                        />
                    }
                </View>
            ))}
        </View>
    )
}