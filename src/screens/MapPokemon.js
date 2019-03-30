import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";

import { getPokemon } from '../publics/redux/actions/pokemon';

class MapPokemon extends Component{
    constructor(){
        super();

        this.state = {
            region: {
                latitude: -6.5976236,
                longitude: 106.7973811,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount(){
        this.loadDataPokemon();
    }

    async loadDataPokemon(){
        await this.props.dispatch(getPokemon(1, 25));
    }

    render(){
        return(
            <View style={{ flex:1 }}>
                <MapView
                    style={{ flex: 1, width: '100%', height: '100%' }}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                >
                    {this.props.pokemon.data.data.map(poke => (
                        <MapView.Marker
                            key={poke.id}
                            coordinate={{ latitude: parseFloat(poke.latitude), longitude: parseFloat(poke.longitude) }}
                            title={poke.name_pokemon}
                            description={poke.category.name_category}
                        >
                            <Image source={{ uri: poke.image_url }} style={{ width: 40, height: 40 }} />
                        </MapView.Marker>
                    ))}
                </MapView>

                <TouchableOpacity style={{ backgroundColor: '#1C3F94', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', opacity: 0.8, marginTop: 5, marginLeft: 5 }} onPress={() => this.props.navigation.navigate('PokemonPage')}>
                    <Icon name="ios-arrow-back" size={20} color='white' />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        pokemon: state.pokemon
    }
}

export default connect(mapStateToProps)(MapPokemon);
