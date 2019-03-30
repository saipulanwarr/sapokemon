import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ScrollView, FlatList, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { BottomSheet } from 'react-native-btr';

import { getTypes, addType, editType, deleteType } from '../publics/redux/actions/types';

class TypesPokemon extends Component{
    constructor(){
        super();

        this.state = {
            visible: false,
            titleBottomSheet: '',
            name: '',
            idTypes: ''
        }
    }

    componentDidMount(){
        this.loadDataTypes();
    }

    toggleBottomNavigation = () => {
        this.setState({
            visible: !this.state.visible,
            name: '',
            idTypes: ''
        })
    }

    async loadDataTypes(){
        await this.props.dispatch(getTypes())
    }

    actAddTypes(action, item){
        this.toggleBottomNavigation();

        this.setState({
            titleBottomSheet: action
        })

        if(action == 'Edit Types'){
            this.setState({
                titleBottomSheet: action,
                idTypes: item.id,
                name: item.name_type
            })
        }
    }

    refreshType(){
        this.loadDataTypes();
    }

    async actSave(){
        await this.props.dispatch(addType({
            name_type: this.state.name
        }))
        .then(res => {
            this.refs.toast.show('Save Successfull');
            setTimeout(() => {
                this.toggleBottomNavigation();
            }, 3000)
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actUpdate(){
        await this.props.dispatch(editType(this.state.idTypes, {
            name_type: this.state.name
        }))
        .then(res => {
            this.refs.toast.show('Update Successfull');
            setTimeout(() => {
                this.toggleBottomNavigation();
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    async actDelete(item){
        Alert.alert(
        'Konfirmasi Hapus',
        `Apakah Anda Yakin Ingin Menghapus Type Ini ?`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                this.props.dispatch(deleteType({
                    id: item.id
                }))
                .then(res => {
                    this.refs.toast.show('Delete Successfull');
                    setTimeout(() => {
                        this.toggleBottomNavigation();
                    }, 3000);
                })
                .catch(err => {
                    console.log(err);
                })
            }},
        ],
        {cancelable: false},
        );
    }

    renderItem = ({ item }) => {
        return(
            <View>
                <TouchableOpacity 
                    onPress={() => this.actAddTypes('Edit Types', item)}
                    onLongPress={() => this.actDelete(item)}>
                    <View style={{ padding: 15 }}>
                        <Text>{item.name_type}</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 10, right: 15 }}>
                        <Icon name="ios-arrow-dropright" size={25} style={{ color: '#1C3F94' }} />
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View> 
            </View>  

        )
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                        onPress={() => this.props.navigation.navigate('PokemonPage')}
                    >
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Types Pokemon</Text>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8 }} onPress={() => this.actAddTypes('Add Types')}>
                            <Text style={{ color: 'white' }}>Add Types</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>   
                <FlatList 
                    data={this.props.types.data}
                    renderItem={this.renderItem}
                    refreshing={this.props.types.isLoading}
                    onRefresh={() => this.refreshType()}
                />

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigation}
                    onBackdropPress={this.toggleBottomNavigation}
                >
                    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                            <TouchableOpacity 
                                style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                                onPress={() => this.toggleBottomNavigation()}
                            >
                                <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>{this.state.titleBottomSheet}</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput 
                                    placeholder="Name Types"
                                    value={this.state.name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    style={{ borderWidth: 1, borderColor: '#f5f5f5' }}
                                />
                                {this.state.titleBottomSheet == 'Add Types' ? 
                                    <TouchableOpacity 
                                        style={{ backgroundColor: '#1C3F94', padding: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.actSave()}
                                    >
                                        <Text style={{ color: 'white' }}>Save</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity 
                                    style={{ backgroundColor: '#1C3F94', padding: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.actUpdate()}
                                    >
                                        <Text style={{ color: 'white' }}>Update</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <Toast 
                        ref="toast"
                        style={{ backgroundColor: 'black' }}
                        position='bottom'
                        positionValue={150}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />

                </BottomSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        types: state.types
    }
}

export default connect(mapStateToProps)(TypesPokemon);