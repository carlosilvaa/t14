import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CButton() {

  return (
  <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer}>  
            <Text style={styles.ButtonText}>Press Here</Text>
          </TouchableOpacity>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  buttonContainer: {
   marginVertical:50,
   height:50,
   marginHorizontal:10,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:50,
   backgroundColor: '#334B34' 
  },

  ButtonText:{
   color:'#fff',
   fontSize:16,
   fontWeight: 'bold' 
  }

});
