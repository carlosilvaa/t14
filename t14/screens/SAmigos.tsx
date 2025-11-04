import CButton from "../components/CButton";
import {StyleSheet, View} from 'react-native';

export default function SAmigos(){
  return(
    <View style={styles.container}>
    <CButton/>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});