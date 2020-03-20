import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet, Button,FlatList, Alert} from 'react-native';
class SearchResultsScreen extends Component{
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
      userSearch: []
    };
  }

  searchUser(search_user){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/search_user?q="+search_user)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            userSearch: responseJson
          });
            })

            .catch((error) =>{
              console.log(error);
              });
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


  componentDidMount(){
this.searchUser(this.props.navigation.getParam('search_user',''));
  }



//
// onLoad = () => {
//   this.props.navigation.addListener('didFocus', () => this.setState(name: this.props.navigation.getParam('name','') ))
// }

  render(){
    const token =  this.props.navigation.getParam('token', '');
    const idd = this.props.navigation.getParam('idd','')
    const search_user = this.props.navigation.getParam('search_user','')
    return(
      <View>
      <Text>Search Results</Text>
      <Text>{this.state.userSearch.given_name}</Text>
      <Text>{token}</Text>
      <Text>{search_user}</Text>


      <FlatList
      data={this.state.userSearch}
      renderItem={({item}) =>
      <View>
       <Text >{item.given_name} {item.family_name} </Text>

       <Button
       title="View Profile"
       onPress={() =>    this.props.navigation.navigate('AccountScreen', { token: token ,user_id: item.user_id})}
       />
      </View>}
      keyExtractor={({id}, index) => id}
      />


      </View>
    );
  }



}
export default SearchResultsScreen;
