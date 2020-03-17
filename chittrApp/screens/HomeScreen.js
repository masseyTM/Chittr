/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';

import { FlatList,StyleSheet, ActivityIndicator, Text, View, Button } from 'react-native';


class HomeScreen extends Component {
  constructor(props){
  super(props);
  this.state ={
    isLoading: true,
    allChits: [],
    allFollowersChits: [],

    }
  }



  getAllChits(){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isLoading: false,
          allChits: responseJson
          });
    })
    .catch((error) =>{
      console.log(error);
      });
    }

    getFollowersChits(token){

      return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
      {
      method:'GET',
      headers: {
        "Content-Type":"application/json",
        "X-Authorization": token}
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isLoading: false,
            allFollowersChits: responseJson
            });
      })
      .catch((error) =>{
        console.log(error);
        });
      }


 componentDidMount(){
 this.getAllChits(),
 this.getFollowersChits();
}



static navigationOptions = {
 header: null
}


 render() {
   //Get token from login screen
   const token =  this.props.navigation.getParam('token', '')


   this.getFollowersChits(token);

  //Loading bar to show user something is happening
   if(this.state.isLoading){
     return(
       <View>
       <ActivityIndicator/>
       </View>
       )
     }

    //If no user logged in , show all chits
     if(token === ""){
       return (
         <React.Fragment>

         
              <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

              <Text style= {styles.titleText}>Chittr</Text>
              <Button
                title="Log In/Sign"
                onPress={() => this.props.navigation.navigate('LogIn')}/>
           </View>


           <View style={styles.container}>
            <FlatList
              data={this.state.allChits}
              renderItem={({item}) => <Text style={styles.chitsText}>{item.user.given_name} {"\n"}{item.chit_content} {"\n"}{item.timestamp}</Text>}
              keyExtractor={({id}, index) => id}
              />
           </View>
         </React.Fragment>
         );
     }
     else {
       //When user logged in


       return(

         <React.Fragment>
              <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

              <Text style= {styles.titleText}>Chittr</Text>
              <Button
                title="Account"

                onPress={() =>   this.props.navigation.navigate('AccountScreen', { token: token}, {id: id})
}/>



           </View>



           <View style={styles.container}>

            <FlatList
              data={this.state.allFollowersChits}
              renderItem={({item}) => <Text style={styles.chitsText}>{item.user.given_name} {"\n"}{item.chit_content} {"\n"}{item.timestamp}</Text>}
              keyExtractor={({id}, index) => id}
              />
           </View>
         </React.Fragment>
         );
     }

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

        export default HomeScreen;
