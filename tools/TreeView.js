import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default class TreeView extends React.Component {
    state = {
        selectedOptions: {}
    }
    
    render = () => {
        return (
            <View>
                {this.props.data
                    ? <TreeList 
                        options={this.props.data}
                        onChange={(selectedOptions) => this.setState({selectedOptions})}
                        selectedOptions={this.state.selectedOptions} 
                        level={0}
                    />
                    : <Text>Could not found data</Text>
                }
            </View>
        )
    }
}

const TreeList = ({ options, selectedOptions, onChange, level}) => {
    const handleElementClicked = (selectedOptionId) => {
        if (selectedOptions[selectedOptionId]){ // Is currently selected
            delete selectedOptions[selectedOptionId]; // Remove selected key from options list
        } else { // is not currently selected
            selectedOptions[selectedOptionId] = {} // Add selected key to optionsList
        }
        onChange(selectedOptions) // call onChange function given by parent
    }
    
    const handleSubOptionsListChange = (optionId, subSelections) => {
        selectedOptions[optionId] = subSelections;
        onChange(selectedOptions);
    }

    const getIndicator = (isSelected, hasNext) => {
        if (isSelected && hasNext)
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0'}} size={32} icon='chevron-down' />
        else if (hasNext)
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0'}} size={32} icon='chevron-right' />
        else
            return <Avatar.Icon color={'#7B68EE'} style={{backgroundColor: '#1fe0', marginLeft: 8, marginRight: 8}} size={16} icon='record' />
    }
    
    return (
        <View>
            {options.map(option => (
                <View>
                    <TouchableOpacity onPress={() => handleElementClicked(option.id)}>
                        <View style={{height: 32, display: 'flex', flexDirection: 'row', marginLeft: level * 32, alignItems: 'center'}}>
                            {getIndicator(selectedOptions[option.id], option.subContent.length > 0)}
                            <Text>{option.name}</Text>
                        </View>
                    </TouchableOpacity>
                    {(option.subContent.length > 0 && selectedOptions[option.id]) &&
                        <TreeList
                            options={option.subContent}
                            selectedOptions={selectedOptions[option.id]} 
                            onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
                            level={level + 1}
                        />
                    }
                </View>
            ))}
      </View>
    )
}