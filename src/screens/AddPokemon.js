import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ScrollView, FlatList, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { BottomSheet } from 'react-native-btr';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CheckBox } from 'react-native-elements';

import { getCategory } from '../publics/redux/actions/category';
import { getTypes } from '../publics/redux/actions/types';
import { addPokemon, getPokemon, editPokemon } from '../publics/redux/actions/pokemon';
import { addTypesPokemon } from '../publics/redux/actions/typespokemon';

let tempCheckValues = [];

class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            visibleMaps: false,
            categorySelect: 'Select category',
            name_pokemon: '',
            image_url : '',
            latitude: 0,
            longitude: 0,
            category_id: '',
            idEditPokemon: '',
            mapRegion: null,
            checkBoxChecked: []
        }

        this.item = null;

        if(props.navigation.state.params && props.navigation.state.params.item){
            this.item = props.navigation.state.params.item
        }
    }

    componentDidMount(){
        this.loadDataCategory();
        this.loadDataTypes();
        
        if(this.item != null){
            this.setState({
                idEditPokemon: this.item.id,
                name_pokemon: this.item.name_pokemon,
                image_url: this.item.image_url,
                latitude: this.item.latitude,
                longitude: this.item.longitude,
                category_id: this.item.category.id,
                categorySelect: this.item.category.name_category
            })
        }
    }

    async loadDataCategory(){
        await this.props.dispatch(getCategory());
    }

    async loadDataTypes(){
        await this.props.dispatch(getTypes());
    }

    async loadDataPokemon(){
        await this.props.dispatch(getPokemon());
    }

    toggleBottomNavigation = () => {
        this.setState({ visible: !this.state.visible });
    }

    toggleBottomNavigationMaps = () => {
        this.setState({ visibleMaps: !this.state.visibleMaps })
    }

    checkBoxChanged(id, value){
        this.setState({
            checkBoxChecked: tempCheckValues
        })

        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
    }

    async onRegionChange(region, latitude, longitude){
        await this.setState({
            mapRegion: region,
            latitude: latitude || this.state.latitude,
            longitude: longitude || this.state.longitude
        })
    }

    actSelectCategory(item){
        this.setState({
            category_id: item.id,
            categorySelect: item.name_category 
        })

        this.toggleBottomNavigation();
    }

    async actAddPokemon(){

        if(this.state.idEditPokemon == ""){
            await this.props.dispatch(addPokemon({
                category_id: this.state.category_id,
                image_url: this.state.image_url,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                name_pokemon: this.state.name_pokemon
            }))
            .then((res) => {
                
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            await this.props.dispatch(editPokemon(this.state.idEditPokemon, {
                category_id: this.state.category_id,
                image_url: this.state.image_url,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                name_pokemon: this.state.name_pokemon
            }))
        }

        this.refs.toast.show('Save Pokemon Successfull');
    
        await this.loadDataPokemon();

        this.props.navigation.navigate('PokemonPage');
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#1C3F94', padding: 5 }} 
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="ios-arrow-round-back" size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>{this.item == null ? 'Add Pokemon' : 'Edit Pokemon'}</Text>
                    </View>
                </View>

                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>      
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput 
                                placeholder="Pokemon name" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={this.state.name_pokemon} 
                                onChangeText={(text) => this.setState({ name_pokemon: text })} 
                            />
                            <TextInput 
                                placeholder="Image URL" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={this.state.image_url} 
                                onChangeText={(text) => this.setState({ image_url: text })} 
                            />

                            <TouchableOpacity style={{ backgroundColor: '#1C3F94', width: 330, padding: 5, marginTop: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.toggleBottomNavigationMaps()}>
                                <Text style={{ color: 'white' }}>Add Maps</Text>
                            </TouchableOpacity>

                            <TextInput 
                                placeholder="Latitude" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={`${this.state.latitude}`} 
                                onChangeText={(text) => this.setState({ latitude: text })} 
                            />

                            <TextInput 
                                placeholder="Longitude" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={`${this.state.longitude}`} 
                                onChangeText={(text) => this.setState({ longitude: text })} 
                            />
                            <Text style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>Types Pokemon: </Text>
                            <View style={{ flexDirection: 'row', width: 330 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.props.types.data.map((val) => {
                                        {tempCheckValues[val.id] = false }
                                        return(
                                            <CheckBox 
                                                key={val.id}
                                                title={val.name_type}
                                                checked={this.state.checkBoxChecked[val.id]}
                                                onPress={() => this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id])}
                                            />
                                        )
                                    })}
                                </ScrollView>
                            </View>
                            
                            <TouchableOpacity onPress={this.toggleBottomNavigation} style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#f5f5f5', padding: 10, width: 330 }}>
                                    <Text>{this.state.categorySelect}</Text>
                                </View>
                                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 8 }}>
                                    <Icon name="ios-arrow-dropdown" size={20} />
                                </View>
                            </TouchableOpacity>
                            
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8, justifyContent: 'center', alignItems: 'center', width: 330 }} onPress={() => this.actAddPokemon()}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Save Pokemon</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> 
                </View>

                 <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this.toggleBottomNavigation}
                    onBackdropPress={this.toggleBottomNavigation}
                >
                    <View style={{ backgroundColor: 'white', height: 130, width: '100%', padding: 10 }}>

                    {this.props.category.data.map((item) => {
                        return(
                            <TouchableOpacity key={item.id} onPress={() => this.actSelectCategory(item)}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Icon name="ios-person" size={25} />
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.name_category}</Text>
                                </View>
                            </TouchableOpacity>     
                        )
                    })}
                    </View>
                </BottomSheet>

                <BottomSheet
                    visible={this.state.visibleMaps}
                    onBackButtonPress={this.toggleBottomNavigationMaps}
                    onBackdropPress={this.toggleBottomNavigationMaps}
                >
                    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <GooglePlacesAutocomplete
                        placeholder='Enter Location'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'search'} 
                        listViewDisplayed='auto'    
                        fetchDetails={true}
                        listViewDisplayed='auto'
                        renderDescription={row => row.description}
                        getDefaultValue={() => ''}
                        query={{
                            key: 'AIzaSyCLo6jTe5ToBCy6wvMBgjKjXMzl2bAuv5I',
                            language: 'en',
                            types: '(cities)',
                        }} 
                        onPress={(data, details = null) => {
                            const region = {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5
                            };
                            this.onRegionChange(region, region.latitude, region.longitude);
                        }}
                        currentLocation={false}
                    />
                    <MapView
                        style={{ width: '100%', height: '70%' }}
                        region={this.state.mapRegion}
                        onRegionChange={(regions) => {
                            this.setState({
                                mapRegion: regions
                            })
                        }}
                        onPress={(e) => {
                            const region = {
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5
                            }
                            this.onRegionChange(region, region.latitude, region.longitude);
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: (this.state.latitude),
                                longitude: (this.state.longitude),
                            }}
                            title="Lokasi"
                            desciprtion="Disini"
                        >

                        </MapView.Marker>
                    </MapView>
                    </View>
                </BottomSheet>         

                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={80}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        category: state.category,
        types: state.types
    }
}


export default connect(mapStateToProps)(RegisterPage);