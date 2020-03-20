import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
class ChitPhotoScreen extends Component {
 constructor(props){
 super(props);
 }

 uploadChitPic(data, token, chit_id) {
   return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+chit_id+"/photo",
   {
   method: 'POST',
   headers: {
    "Content-Type": "image/jpeg",
    "X-Authorization": token,
  },
   body:data
 })
 .then(response => {
   Alert.alert("Picture uploaded");
       this.props.navigation.navigate('HomeScreen', {token: token, user_id: user_id})
 })
 .catch((error) => {
   Alert.alert("Upload unsuccessful");

 });
}

 render() {
 return (
 <View style={styles.container}>
 <RNCamera
 ref={ref => {
 this.camera = ref;
 }}
 style={styles.preview}
 />
 <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
 <TouchableOpacity
 onPress={this.takePicture.bind(this)}
 style={styles.capture}
 >
 <Text style={{ fontSize: 16 }}>
 CAPTURE
 </Text>
 </TouchableOpacity>
 </View>
 </View>
 );
 }
 takePicture = async() => {
 if (this.camera) {
 const options = { quality: 0.5, base64: true };
 const data = await this.camera.takePictureAsync(options);
 const token = this.props.navigation.getParam('token', '');
 const chit_id = this.props.navigation.getParam('chit_id', '');
   this.uploadChitPic(data , token, chit_id)

 }
 };
}
const styles = StyleSheet.create({
 container: { flex: 1, flexDirection: 'column' },
 preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
 capture: { flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
 alignSelf: 'center', margin: 20, }
});
export default ChitPhotoScreen
