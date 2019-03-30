import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, AsyncStorage, TextInput, StyleSheet, Alert } from 'react-native';
import { Fab } from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { getPokemon, searchPokemon } from '../publics/redux/actions/pokemon';
import Autocomplete from 'react-native-autocomplete-input';

class PokemonPage extends Component{

    constructor(){
        super();

        this.state = {
            active: 'true',
            page: 1,
            query: ''
        }
    }

    componentDidMount(){
        this.loadDataPokemon();

        this.setState({ query: '' });
    }

    async loadDataPokemon(){
        await this.props.dispatch(getPokemon(this.state.page, 10));
    }

    onRefreshPokemon = () => {
        this.loadDataPokemon();
        this.setState({ query: '' });
    }

    async getToken(){
        try{
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            if(tokenUser !== null){
                this.props.navigation.navigate('AddPokemon');
                
            }else{
                this.props.navigation.navigate('LoginPage');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    renderItem = ({item}) => {
        return(
            <View key={item.id}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPokemon', {item: item})}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Image source={{ uri: item.image_url }} style={{ width: 60, height: 60 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text>{item.name_pokemon}</Text>
                            <Text>{item.category.name_category}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {item.type.map((type) => {
                                    return(
                                        <Text key={type.id}>{type.name_type} {' '}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 20, right: 15 }}>
                            <Icon name="ios-arrow-dropright" size={25} style={{ color: '#1C3F94' }} />
                        </View>
                    </View>
                    <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>
                </TouchableOpacity>
            </View>
        )
    }

    addPokemon = () => {
       this.getToken();
    }

    filterData(query){
        if(query === '') {
            return [];
        }
      
        const regex = new RegExp(`${query.trim()}`, 'i');
        return this.props.pokemon.data.data.filter(pokemon => pokemon.name_pokemon.search(regex) >= 0);
    }

    async actSearch(name_pokemon){
        this.setState({ query: name_pokemon })

        await this.props.dispatch(searchPokemon(name_pokemon))
    }

    renderHeader = () => {

        const {query}  = this.state;
        const pokemons = this.filterData(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return(
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image source={require('../images/o.png')} style={{ width: 35, height: 35, borderRadius: 30 }} />
                </TouchableOpacity>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={pokemons.length === 1 && comp(query, pokemons[0].name_pokemon) ? [] : pokemons}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter Name Pokemon"
                    renderItem={({ name_pokemon }) => (
                        <TouchableOpacity style={{ margin: 0, padding: 0, backgroundColor: '#FFF' }} onPress={() => this.actSearch(name_pokemon)}>
                        <Text style={styles.itemText}>
                            {name_pokemon}
                        </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    async loadMore(){
        if(this.state.page <= this.props.pokemon.data.lastPage){
            await this.loadDataPokemon();
        }
    }

    render(){
        console.disableYellowBox = true;
        if(this.props.pokemon.isLoading){
            return(
                <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return(
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.pokemon.data.data}
                    renderItem={this.renderItem}
                    refreshing={this.props.pokemon.isLoading}
                    onRefresh={() => this.setState({ page: 1 }, () => this.onRefreshPokemon() )}
                    ListHeaderComponent={this.renderHeader} 
                    onEndReached={() => this.setState({ page: this.state.page + 1 }, () => this.loadMore())}
                    onEndReachedThreshold={0.1}
                />
                
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{  }}
                    style={{ backgroundColor: '#1C3F94' }}
                    position="bottomRight"
                    onPress={this.addPokemon}>
                    <Icon name="ios-add" size={50} />
                </Fab>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        marginTop: 5,
        marginLeft: 5
    }
})

const mapStateToProps = (state) => {
    return{
        pokemon: state.pokemon,
        user: state.user
    }
}

export default connect(mapStateToProps)(PokemonPage);