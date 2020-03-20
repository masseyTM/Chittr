/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/


import React, { Component } from 'react';

import { FlatList,StyleSheet, ActivityIndicator, Text, View, Button,Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      allChits: [],
      allFollowersChits: [],
      chit_content: '',
      chit_id: '',
      timestamp: '',
      search_user: '',
      draftChit: ''
    }
  }

//only started to try async for the extension class
  storeChit = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', this.state.chit_content)
    } catch (e) {

    }
  }

  getStoredChit = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
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

//pass through login token to only show people you follow
// passed with header
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


//take user input from text entry, there is a limit set on text input to not allow over 141 Characters
// also a countdown has been placed for the user to know when limit is close
                  postChit (token){
                    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
                    {
                      method: 'POST',
                      headers: {
                        "Content-Type":"application/json",
                        "X-Authorization": token
                        },
                        body: JSON.stringify({

                          chit_id : 0,
                          timestamp: 0,
                          chit_content : this.state.chit_content

                          })
                          })
                          .then(response =>  {
                            // Showing response message coming from server after inserting records.
                            this.props.navigation.navigate('Home', { token: token})
                            })
                            .catch((error) => {
                              console.error(error);
                              });
                            }
                            componentDidMount(){
                              this.getAllChits(),
                              this.getFollowersChits(this.props.navigation.getParam('token', ''));
                            }



//remove default nav bar at top of screen
                            static navigationOptions = {
                              header: null
                            }


                            render() {
                              //Get token from login screen
                              const token =  this.props.navigation.getParam('token', '')
                              const idd =  this.props.navigation.getParam('id', '')


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
                                    renderItem={({item}) => <Text style={styles.chitsText}>{item.user.given_name} {"\n"}{item.chit_content}</Text>}
                                    keyExtractor={({id}, index) => id}
                                    />
                                    </View>
                                    </React.Fragment>
                                    );
                                  }



                                  else {
                                    this.getFollowersChits(this.props.navigation.getParam('token', ''));

                                    return(
                                      <React.Fragment>
                                      <View style={[{flexDirection:'row'}, styles.elementsContainer]}>
                                      <Text style= {styles.titleText}>Chittr</Text>
                                      <Button
                                      title="My Account"
                                      onPress={() =>   this.props.navigation.navigate('AccountScreen', { token: token ,id: idd})
                                      }/>

                                      </View>

                                      <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

                                      <TextInput style={{ height: 40, borderColor: '#1D9DDB', borderWidth: 1, flex: 6}}
                                      maxLength = {141}

                                      underlineColorAndroid = "transparent"
                                      placeholder = "Search user name"
                                      placeholderTextColor = "#black"
                                      autoCapitalize = "none"
                                      backgroundColor = "#ffffff"

                                      onChangeText={(search_user) => this.setState({search_user})}
                                      value={this.state.search_user}/>
                                      <Button
                                      title="Search"
                                      onPress={() =>   this.props.navigation.navigate('SearchResultsScreen', { token: token ,id: idd, search_user: this.state.search_user})
                                      }/>


                                      </View>




                                      <View style={styles.container}>
                                      <Text>Tweets from people you follow</Text>
                                      <FlatList
                                      data={this.state.allFollowersChits}
                                      renderItem={({item}) =>
                                      <View>
                                      <Text style={styles.chitsText}>{item.user.given_name} {item.user.family_name} {"\n"}{item.chit_content}</Text>
                                      <Image
                                      style={{width: 50, height: 50,}}
                                      source={{uri : "http://10.0.2.2:3333/api/v0.0.5/chits/"+item.chit_id+"/photo" }}
                                      />
                                      </View>   }
                                      keyExtractor={({id}, index) => id}
                                      />
                                      </View>



                                      <View style={[{flexDirection:'row'}, styles.elementsContainer]}>
                                      <Text style = { styles.characterCount}>{('Characters remaining - ' +( 141 - this.state.chit_content.length))}</Text>
                                      <Button
                                      title="Save draft"
                                      onPress={() => asy }
                                      />
                                      <Button
                                      title="Post chit"
                                      onPress={() =>   this.postChit(token)}
                                      />
                                      </View>


                                      <View style={styles.flex2}>
                                      <TextInput style={{ height: 40, borderColor: '#1D9DDB', borderWidth: 1 }}
                                      maxLength = {141}
                                      underlineColorAndroid = "transparent"
                                      placeholder = "Type chit here"
                                      placeholderTextColor = "#black"
                                      autoCapitalize = "none"
                                      backgroundColor = "#ffffff"

                                      onChangeText={(chit_content) => this.setState({chit_content})}
                                      value={this.state.chit_content}
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
                                    flex: 12,
                                    display: 'flex',

                                    },
                                    elementsContainer: {
                                      flex: 1,
                                      backgroundColor: '#96B1C1'

                                      },
                                      flex2: {
                                        flex: 1,
                                        backgroundColor: '#96B1C1',



                                        },


                                        characterCount:{
                                          flex: 19,
                                          marginTop: 5,
                                          color: 'white'
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
                                              nameText: {
                                                fontSize : 16
                                                },

                                                buttonStyle: {
                                                  marginTop: 10,
                                                  color: 'white',
                                                  backgroundColor: '#1D9DDB'

                                                }
                                                });

                                                export default HomeScreen;
