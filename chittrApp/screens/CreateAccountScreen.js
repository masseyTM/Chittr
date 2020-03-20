import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet, Button, Alert} from 'react-native';
class CreateAccountScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

      given_name: '',
      family_name: '',
      email: '',
      password: '',
      id: '',
      token: ''


      };

  }


  createAccount (){
   return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
   {
   method: 'POST',
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
   body: JSON.stringify({

   given_name: this.state.given_name,
   family_name: this.state.family_name,
   email: this.state.email,
   password: this.state.password
   })
   })
   .then(response => response.json())
   .then(responseJson => {
  // Showing response message coming from server after inserting records.

this.props.navigation.navigate('LogIn')
})
   //})
   .catch((error) => {
   console.error(error);
   });

   }


 render(){
 return(
 <View>
   <Text>Please fill in the details below to create your Chittr account</Text>


   <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter first name"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={(given_name) => this.setState({given_name})}
      value={this.state.given_name}
      />

      <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
         underlineColorAndroid = "transparent"
         placeholder = "Enter surname"
         placeholderTextColor = "#9a73ef"
         autoCapitalize = "none"
         onChangeText={(family_name) => this.setState({family_name})}
         value={this.state.family_name}
         />

   <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter email"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />
    <TextInput style={{ height: 40, marginTop: 20,marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}
       underlineColorAndroid = "transparent"
       placeholder = "Enter password"
       placeholderTextColor = "#9a73ef"
       autoCapitalize = "none"
       onChangeText={(password) => this.setState({password})}
       value={this.state.password}
       />

    <Button
       title="Create account"
       onPress={() => this.createAccount()}/>


 </View>
 );
 }



}
export default CreateAccountScreen;
