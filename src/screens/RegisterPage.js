import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { register } from '../publics/redux/actions/register';

class RegisterPage extends Component{
    constructor(){
        super();
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            visible: false,
            showPassword: true,
            fullName: 'Nama Lengkap',
            txtFullname: '',
            txtEmail: '',
            txtPassword: ''
        }
    }

    toggleSwitch(){
        this.setState({ showPassword: !this.state.showPassword });
    }

    actRegister(){
        this.props.dispatch(register({
            username: this.state.txtFullname,
            fullname: this.state.txtFullname,
            email: this.state.txtEmail,
            password: this.state.txtPassword
        }))

        this.setState({
            txtFullname: "",
            txtEmail: "",
            txtPassword: ""
        })
        
        this.refs.toast.show('Signup Successfully, please login');

        setTimeout(() => {
            this.props.navigation.navigate('LoginPage');
        }, 3000);

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
                        <Text style={{ color: '#1C3F94', fontSize: 20, fontWeight: 'bold' }}>Pokemon</Text>
                    </View>
                </View>

                <View style={{ borderColor: '#f5f5f5', borderWidth: 1 }}></View>      
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput 
                                placeholder={this.state.fullName} 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={this.state.txtFullname} 
                                onChangeText={(text) => this.setState({ txtFullname: text })} 
                            />
                            <TextInput 
                                placeholder="Email.." 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10 }} 
                                value={this.state.txtEmail} 
                                onChangeText={(text) => this.setState({ txtEmail: text })} 
                            />
                            <TextInput 
                                secureTextEntry={this.state.showPassword} 
                                placeholder="Password" 
                                style={{ borderWidth: 1, borderColor: '#f5f5f5', width: 330, marginTop: 10}} 
                                value={this.state.txtPassword} onChangeText={(text) => this.setState({ txtPassword: text })} 
                            />

                            <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 190 }}>
                                <Switch 
                                    onValueChange={this.toggleSwitch}
                                    value={!this.state.showPassword}
                                />
                                <Text>Show Password</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity style={{ backgroundColor: '#1C3F94', padding: 8, justifyContent: 'center', alignItems: 'center', width: 330 }} onPress={() => this.actRegister()}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="ios-person" size={20} style={{ color: 'white' }} />
                                        <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Signup</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> 
                </View>         

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

export default connect()(RegisterPage);