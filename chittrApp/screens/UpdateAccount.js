import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet, Button, Alert} from 'react-native';
class UpdateAccount extends Component{
  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      given_name: '',
      family_name: '',
      email: '',
      password: '',
      id: '',
      token: '',
      userDetails: []
    };
  }


  updateUserDetails(idd, token){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+idd,
    {
      method: 'PATCH',
      headers: {
        "Content-Type":"application/json",
        "X-Authorization": token
      },
      body: JSON.stringify({
        given_name: this.state.given_name,
        family_name: this.state.family_name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
      Alert.alert(JSON.stringify("Update Successfull"));
    })
    .catch((error) =>{
      console.log(error);
    });
  }

//
// onLoad = () => {
//   this.props.navigation.addListener('didFocus', () => this.setState(name: this.props.navigation.getParam('name','') ))
// }

  render(){
    const token =  this.props.navigation.getParam('token', '');
    const idd = this.props.navigation.getParam('idd','')
    const name = this.props.navigation.getParam('name','')
    return(
      <View>
      <Text>Please make any changes in the details below to update your Chittr account</Text>
      <Text>{idd}</Text>
      <Text>{token}</Text>
      <Text>{name}</Text>
      <Text>{this.state.userDetails.family_name}</Text>
      <Text>{this.state.userDetails.email}</Text>
      <Text>{this.state.userDetails.password}</Text>

      <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter first name"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={((given_name) => {this.setState({given_name: given_name})})}
      value={this.state.given_name}
      />

      <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter surname"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={((text) => {this.setState({family_name: text})})}
      value={this.state.family_name}
      />

      <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter email"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={((text) => {this.setState({email: text})})}
      value={this.state.email}
      />
      <TextInput style={{ height: 40, marginTop: 20,marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter password"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={((text) => {this.setState({password: text})})}
      value={this.state.password}
      />

      <Button
      title="Update account"
      onPress={() => this.updateUserDetails(idd, token)}/>
      </View>
    );
  }



}
export default UpdateAccount;
