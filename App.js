import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/publics/redux/store';

import SplashScreen from 'react-native-splash-screen';

import SideBar from './src/components/SideBar';
import PokemonPage from './src/screens/PokemonPage';
import DetailPokemon from './src/screens/DetailPokemon';
import AddPokemon from './src/screens/AddPokemon';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import MapPokemon from './src/screens/MapPokemon';
import TypesPokemon from './src/screens/TypesPokemon';

const kanataPage = createStackNavigator({
  PokemonPage: {
    screen: PokemonPage,
    navigationOptions: {
      header: null
    }
  },
  DetailPokemon: {
    screen: DetailPokemon,
    navigationOptions: {
      header: null
    }
  },
  AddPokemon: {
    screen: AddPokemon,
    navigationOptions: {
      header: null
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  RegisterPage: {
    screen: RegisterPage,
    navigationOptions: {
      header: null
    }
  },
  MapPokemon: {
    screen: MapPokemon,
    navigationOptions: {
      header: null
    }
  },
  TypesPokemon: {
    screen: TypesPokemon,
    navigationOptions: {
      header: null
    }
  }
})

const PageDrawer = createDrawerNavigator({
  PageDrawerSc: { screen: kanataPage }
},
{
  contentComponent: props => <SideBar {...props} />
})

const AppRoot = createAppContainer(PageDrawer);

export default class Root extends Component{
  componentDidMount(){
    SplashScreen.hide();
  }
  render(){
    return(
      <Provider store={store}>
        <AppRoot />
      </Provider>
    )
  }
}