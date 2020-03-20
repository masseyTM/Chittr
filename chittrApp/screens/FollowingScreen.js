import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet,FlatList, Button, Alert} from 'react-native';
class FollowingScreen extends Component{
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

  getFollowing(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/following')
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


  componentDidMount(){
    this.getFollowing(this.props.navigation.getParam('my_id',''));
  }






//
// onLoad = () => {
//   this.props.navigation.addListener('didFocus', () => this.setState(name: this.props.navigation.getParam('name','') ))
// }

  render(){



    return(
      <View>
      <Text>Following</Text>
      <FlatList
      data={this.state.followingDetails}
      renderItem={({item}) =>
      <View>
       <Text >{item.given_name} {item.family_name} {item.user_id} </Text>

       <Button
       title="View Profile"
       onPress={() =>    this.props.navigation.navigate('AccountScreen', { token: this.state.token ,user_id: item.user_id})}
       />
      </View>}
      keyExtractor={({id}, index) => id}
      />

      </View>
    );
  }



}
export default FollowingScreen;
