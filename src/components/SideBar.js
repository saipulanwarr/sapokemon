import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

class SideBar extends Component{

    constructor(){
        super();

        this.state = {
            token: ''
        }
    }

    async actLogout(){
        try{
            await AsyncStorage.removeItem('tokenUser');
        }
        catch(error){
            console.log(error.message);
        }

        this.props.navigation.navigate('PokemonPage');
    }

    async getToken(){
        try{
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            if(tokenUser !== null){
                this.setState({ token: tokenUser })
                
            }else{
                this.setState({ token: '' })
            }
        }
        catch(error){
            console.log(error);
        }
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ marginTop: 10, width: 150, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, color: '#1C3F94' }}>{this.props.user.data.username}</Text>
                    </View>
                </View>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PokemonPage')}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-home" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>List Pokemon</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MapPokemon')}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-locate" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Map</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('TypesPokemon')}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-locate" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Types Pokemon</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>

                <TouchableOpacity onPress={() => this.actLogout()}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Icon name="ios-exit" size={25} style={{ color: '#1C3F94' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#1C3F94' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SideBar);