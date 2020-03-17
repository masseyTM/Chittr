import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet,FlatList, Button, Alert} from 'react-native';
class AccountScreen extends Component{
  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {

      given_name: '',
      family_name: '',
      email: '',
      passsword: '',
      id: '',
      token: '',
      userDetails: []

      };
  }

  getUserDetails(idd){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+idd)
    .then((response) => response.json())
    .then((responseJson) => {

        this.setState({
          isLoading: false,
          userDetails: responseJson
          });
    })
    .catch((error) =>{
      console.log(error);
      });
    }




 render(){
   const token =  this.props.navigation.getParam('token', '');
   const idd = this.props.navigation.getParam('id','')

   this.getUserDetails(idd);


 return(
 <View>
   <Text>My Account </Text>
<Text>{idd}</Text>
     <Text>{this.state.userDetails.given_name}</Text>
     <Text>{this.state.userDetails.family_name}</Text>
     <Text>{this.state.userDetails.email}</Text>


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
       title="Log In"
    onPress ={
          () => this.addItem()


       }/>

    <Button
       title="Create account"
       onPress={() => this.props.navigation.navigate('CreateAccount')}/>


 </View>
 );
 }



}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
    flex: 10,
    display: 'flex',

  },
  elementsContainer: {
  flex: 1,
  backgroundColor: '#1D9DDB'

},
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
    color: 'white',
    flex: 10,
  },
  chitsText: {
    fontSize: 20,
    marginTop: 10,
  },

  buttonStyle: {
    marginTop: 10,
    color: 'white',
      backgroundColor: '#1D9DDB'

  }
  });
export default AccountScreen;
