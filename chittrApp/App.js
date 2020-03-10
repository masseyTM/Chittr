/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { FlatList,StyleSheet, ActivityIndicator, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
    flex: 10,
    display: 'flex',

  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
    color: 'white',
  },
  chitsText: {
    fontSize: 20,
    marginTop: 10,
  }
  });

class Lab03ex3 extends Component {
  constructor(props){
  super(props);
  this.state ={
    isLoading: true,
    allChits: []
    }
  }

  getData(){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isLoading: false,
          allChits: responseJson,
          });
    })
    .catch((error) =>{
      console.log(error);
      });
    }

 componentDidMount(){
 this.getData();
}

 render() {
   if(this.state.isLoading){
     return(
       <View>
       <ActivityIndicator/>
       </View>
       )
     }
     return (
       <React.Fragment>
         <View style={{ flex: 1, backgroundColor: '#1D9DDB'}}>
            <Text style={styles.titleText}>Chittr</Text>
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
   }



export default Lab03ex3
