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

  getFollowers(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/followers')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        followersDetails: responseJson

      });
    })
    .catch((error) =>{
      console.log(error);
    });
  }

  getFollowing(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/followers')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        followingDetails: responseJson

      });

    this.props.navigation.navigate('FollowersScreen',  { followingDetails: this.state.followingDetails ,id: id})

    })
    .catch((error) =>{
      console.log(error);
    });
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
          onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>
          </View>

          <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

          <Button
          title="Followers"
          onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>

          <Button
          title="Following"
          onPress={() => this.props.navigation.navigate('FollowingScreen',  { token: token ,my_id: my_id} )}/>
          </View>



          <View style={styles.container}>
          <Text>{this.state.userDetails.given_name}</Text>
          <Text>{this.state.userDetails.family_name}</Text>
          <Text>{this.state.userDetails.email}</Text>
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

        <Text style= {styles.titleText}>Someeone else</Text>
        </View>

        <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

        <Button
        title="Follow"
        onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>

        <Button
        title="Unfollow"
        onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>


        <Button
        title="Followers"
        onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>

        <Button
        title="Following"
        onPress={() => this.props.navigation.navigate('UpdateAccount',  { token: token ,idd: idd, name: this.state.userDetails.given_name})}/>
        </View>



        <View style={styles.container}>
        <Text>{this.state.userDetails.given_name}</Text>
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
