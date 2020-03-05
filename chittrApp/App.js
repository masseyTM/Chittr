/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

class Lab03ex3 extends Component {
 constructor(props){
 super(props);
 this.state ={
isLoading: true,
shoppingListData: []
}
 }

  getData(){
 return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
 .then((response) => response.json())
 .then((responseJson) => {
 this.setState({
 isLoading: false,
 shoppingListData: responseJson,
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
<View>
 <FlatList
 data={this.state.shoppingListData}
 renderItem={({item}) => <Text>{item.chit_id} "/n" {item.chit_content}</Text>}
 keyExtractor={({id}, index) => id}
 />
 </View>


 );
 }


}



export default Lab03ex3
