import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import CButton from './components/CButton';

export default function App() {
  return (
    <View style={styles.Container}>
      <CButton/>
    </View>
  );
}

const styles = StyleSheet.create({
 Container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

