/*
import React, {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const AMIGOS  = [
  {
    id: '1',
    primeiroNome: 'Ana',
    apelido: 'Souza',
    nickname: 'aninha_sz',
    email: 'ana.souza@example.com',
    estado: 'ativo',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    primeiroNome: 'Bruno',
    apelido: 'Lima',
    nickname: 'brunol',
    email: 'bruno.lima@example.com',
    estado: 'pendente',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: '3',
    primeiroNome: 'Carla',
    apelido: 'Ferreira',
    nickname: 'carlaf',
    email: 'carla.ferreira@example.com',
    estado: 'ativo',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: '4',
    primeiroNome: 'Diego',
    apelido: 'Mendes',
    nickname: 'diegom',
    email: 'diego.mendes@example.com',
    estado: 'pendente',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '5',
    primeiroNome: 'Elisa',
    apelido: 'Costa',
    nickname: 'elisa_c',
    email: 'elisa.costa@example.com',
    estado: 'ativo',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
];

type amigosData = {
  id: string,
  primeiroNome: string,
  apelido: string,
  nickname: string,
  email: string,
  estado: 'ativo' | 'pendente',
  avatar: string
};



type amigosProps = {
  item: amigosData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};
 
const Item({item, onPress,backgroundColor, textColor}:) =>{
    <TouchableOpacity onPress={onPress}>
           <Image source={{item.avatar}}/>
           <Text/>
           <Text/>
    </TouchableOpacity>
}

 export default function CFlatList(){
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: amigosData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={AMIGOS}
          renderItem={(amigosData) =>{
            
          }}
          keyExtractor={item => item.id
        
          }
          extraData={selectedId}
        />
        <Image>

        </Image>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
*/