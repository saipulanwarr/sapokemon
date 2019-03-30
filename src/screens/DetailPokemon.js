import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

import { getPokemon, deletePokemon, detailPokemon } from '../publics/redux/actions/pokemon';

class DetailPokemon extends Component{

    constructor(props){
        super(props);
        this.item = null;

        this.state = {
            visible: false,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        }

        if(props.navigation.state.params && props.navigation.state.params.item){
            this.item = props.navigation.state.params.item;
        }
    }

    componentDidMount(){
        if(this.item != null){
            this.setState({
                region: {
                    latitude: parseFloat(this.item.latitude),
                    longitude: parseFloat(this.item.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            })
        }
    }

    componentWillMount(){
        this.loadDataDetailPokemon();
    }

    loadDataDetailPokemon(){
        this.props.dispatch(detailPokemon(this.item.id));
    }

    async loadDataPokemon(){
        await this.props.dispatch(getPokemon());
    }

    toggleBottomNavigation = () => {
        this.setState({ visible: !this.state.visible });
    }

    deletePokemon = (item) => {
        Alert.alert(
        'Konfirmasi Hapus',
        `Apakah Anda Yakin Ingin Menghapus Pokemon Ini ?`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                this.props.dispatch(deletePokemon({
                    id: item.id
                }))
                .then(res => {
                    this.refs.toast.show('Delete Pokemon Successfull');
                    this.loadDataPokemon();
        
                    this.props.navigation.navigate('PokemonPage');
                })
                .catch(err => {
                    console.log(err);
                })
            }},
        ],
        {cancelable: false},
        );
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <Image source={{ uri: this.item.image_url }} style={{ width: '100%', height: 400, marginTop: 10 }} />
                <TouchableOpacity style={{ backgroundColor: '#1C3F94', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', opacity: 0.8, marginTop: 5, marginLeft: 5 }} onPress={() => this.props.navigation.navigate('PokemonPage')}>
                    <Icon name="ios-arrow-back" size={20} color='white' />
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 5 }}></View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>{this.item.name_pokemon}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16 }}>{this.item.category.name_category}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPokemon', { item: this.item })}>
                                <Text style={{ color: '#1C3F94' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.deletePokemon(this.item)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8, marginTop: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 20 }} onPress={this.toggleBottomNavigation}>
                    <Text style={{ color: 'white' }}>Open View Map</Text>
                </TouchableOpacity>
                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={300}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigation}
                    onBackdropPress={this.toggleBottomNavigation}
                >
                    <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                        <MapView
                            style={{ flex: 1, width: '100%', height: '100%' }}
                            initialRegion={this.state.region}
                            showsUserLocation={true}
                        >
                            <MapView.Marker 
                                coordinate={{ latitude: parseFloat(this.state.region.latitude), longitude: parseFloat(this.state.region.longitude) }}
                                title={this.item.name_pokemon}
                                description={this.item.category.name_category}
                            >
                                <Image source={{ uri: this.item.image_url }} style={{ width: 40, height: 40 }} />
                            </MapView.Marker>
                        </MapView>

                        <TouchableOpacity style={{ backgroundColor: '#1C3F94', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', opacity: 0.8, marginTop: 5, marginLeft: 5 }} onPress={this.toggleBottomNavigation}>
                            <Icon name="ios-arrow-back" size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        pokemon: state.pokemon
    }
}

export default connect(mapStateToProps)(DetailPokemon);