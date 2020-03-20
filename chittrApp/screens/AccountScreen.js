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
      password: '',
      id: '',
      token: '',
      userDetails: [],
      followersDetails: [],
      followingDetails: [],
      chits :[]

    };
  }





  followUser(id, token){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/follow',
  {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "X-Authorization": token
    },
  })
  .then((response) => {
    Alert.alert(JSON.stringify("Following"))
  })
    .catch((error) =>{
      console.error(error);
    });
  }

  unFollowUser(id, token){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/follow',
  {
    method: 'DELETE',
    headers: {
      "Content-Type":"application/json",
      "X-Authorization": token
    },
  })

  .then((response) => {
    Alert.alert(JSON.stringify("Unfollowed"))
  })

  }





  getUserDetails(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id)
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

  logOut (token){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
    {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "X-Authorization": token}

      })
      .then(response =>  {
        // Showing response message coming from server after inserting records.
        Alert.alert(JSON.stringify(response));
        this.props.navigation.navigate('Home', { token: ''})


        //{() => this.props.navigation.navigate('Home')}
      })
      //})
      .catch((error) => {
        console.error(error);
      });

    }


    componentDidMount(){
      this.getUserDetails(this.props.navigation.getParam('user_id',''));
    }





    render(){
      const token =  this.props.navigation.getParam('token', '');
      const my_id = this.props.navigation.getParam('id','');
      const other_user_id = this.props.navigation.getParam('user_id','');



      // user account
      if (other_user_id === ""){
            this.getUserDetails(my_id);

        return (
          <React.Fragment>


          <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

          <Text style= {styles.titleText}>My Account</Text>

          <Button
          title="Update Account"
          onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,my_id: my_id, name: this.state.userDetails.given_name})}/>
          </View>

          <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

          <Button
          title="Followers"
          onPress={() => this.props.navigation.navigate('FollowersScreen',  { token: token ,my_id: my_id, name: this.state.userDetails.given_name})}/>

          <Button
          title="Following"
          onPress={() => this.props.navigation.navigate('FollowingScreen',  { token: token ,my_id: my_id} )}/>
          </View>



          <View style={styles.container}>
          <Text>{this.state.userDetails.given_name}</Text>
          <Text>{this.state.userDetails.family_name}</Text>
          <Text>{this.state.userDetails.email}</Text>
          <Text>{token}</Text>
          <Text>{this.state.userDetails.password}</Text>
          </View>



          <View>
          <Button
          title="Log Out"
          onPress={() => this.logOut(token)}/>



          </View>
          </React.Fragment>
        );
      }

      else
      this.getUserDetails(other_user_id);
      return (
        <React.Fragment>


        <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

        <Text style= {styles.titleText}>Someone else</Text>
        </View>

        <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

        <Button
        title="Follow"
        onPress={() => this.followUser(other_user_id, token)}/>

        <Button
        title="Unfollow"
        onPress={() => this.unFollowUser(other_user_id, token)}/>


        <Button
        title="Followers"
        onPress={() => this.props.navigation.navigate('FollowersScreen',  { token: token ,other_user_id: other_user_id} )}/>

        <Button
        title="Following"
        onPress={() =>  this.props.navigation.navigate('FollowingScreen',  { token: token ,other_user_id: other_user_id} )}/>
        </View>



        <View style={styles.container}>
        <Text>{this.state.userDetails.given_name}</Text>
        <Text>{token}</Text>
        <Text>{this.state.userDetails.family_name}</Text>
        <Text>{this.state.userDetails.email}</Text>
        <Text>{this.state.userDetails.password}</Text>
        </View>




        </React.Fragment>
      );
    }

  }





  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E8E8E8',
      flex: 7,
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
