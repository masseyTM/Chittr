import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet,FlatList, Button, Alert} from 'react-native';
class FollowersScreen extends Component{
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
      userDetails: [],
      followingDetails: []
    };
  }

  getFollowers(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/followers')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        followingDetails: responseJson

      });


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
  const other_user_id =  this.props.navigation.getParam('other_user_id', '');
    const my_id =  this.props.navigation.getParam('my_id', '');

      if (other_user_id === ""){

this.getFollowers(my_id);

    return(
      <View>
      <Text>Who is following you</Text>
      <FlatList
      data={this.state.followingDetails}
      renderItem={({item}) =>
      <View>
       <Text >{item.given_name} {item.family_name} {item.user_id} </Text>

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

  else
  this.getFollowers(this.getFollowers(other_user_id));

  return(
    <View>
    <Text>Someone elses followers</Text>
    <FlatList
    data={this.state.followingDetails}
    renderItem={({item}) =>
    <View>
     <Text >{item.given_name} {item.family_name} {item.user_id} </Text>

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
export default FollowersScreen;
