import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import FlatListAmigos, { Amigo } from "@/components/FlatListAmigos";
import InputLupa from "@/components/InputLupa";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AmigosProps {
  navigation: any;
}

const AMIGOS_DATA: Amigo[] = [
  {
    id: '1',
    primeiroNome: 'João',
    apelido: 'Silva',
    nickname: 'joaos',
    email: 'joao.silva@example.com',
    telefone: '+55 11 99999-9999',
    estado: 'ativo',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    primeiroNome: 'Maria',
    apelido: 'Souza',
    nickname: 'mariinhaz',
    email: 'maria.souza@example.com',
    telefone: '+55 21 98888-8888',
    estado: 'pendente',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    primeiroNome: 'Carlos',
    apelido: 'Ferreira',
    nickname: 'cferreira',
    email: 'carlos.ferreira@example.com',
    telefone: '+55 31 97777-7777',
    estado: 'ativo',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    primeiroNome: 'Ana',
    apelido: 'Pereira',
    nickname: 'anap',
    email: 'ana.pereira@example.com',
    telefone: '+351 914222444',
    estado: 'pendente',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export default function Amigos({ navigation }: AmigosProps) {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [filtro, setFiltro] = useState("");

  const validarEmail = (email: string): string => {
    email = email.trim();
    const regex = /^[^@\s]+@([^@\s]+\.)+.+$/;
    if (!regex.test(email)) {
      return "Formato de e-mail inválido. Ex: utilizador@edu.pt";
    }
    return "";
  };

  const handleEnviarConvite = (): void => {
    const erroMsg = validarEmail(email);
    if (erroMsg) {
      setErro(erroMsg);
      setSucesso("");
      return;
    }
    setErro("");
    setSucesso(`Convite enviado com sucesso para ${email}`);
    setEmail("");
  };

  const corBorda = erro ? "red" : sucesso ? "green" : "#ccc";

  const amigosFiltrados = useMemo(() => {
    const termo = filtro.toLowerCase();
    return AMIGOS_DATA.filter((a) =>
      a.primeiroNome.toLowerCase().includes(termo) ||
      a.apelido.toLowerCase().includes(termo) ||
      a.nickname.toLowerCase().includes(termo) ||
      a.email.toLowerCase().includes(termo)
    );
  }, [filtro]);

  return (
    <View style={styles.window}>
      
     
      <View>
        <InputLupa
          placeholder="Digite o email do amigo"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.fullWidth,
            {
              borderColor: corBorda,
              borderWidth: 1,
              borderRadius: 5,
            },
          ]}
        />

        {erro ? <Text style={styles.erroText}>{erro}</Text> : null}
        {sucesso ? <Text style={styles.sucessoText}>{sucesso}</Text> : null}

      </View>

      
      <View style={[styles.container, { marginTop: 2 }]}>
        <Button
          title="Enviar Convite"
          style={styles.fullWidth}
          onPress={handleEnviarConvite}
        />
        <IconButton style={styles.fullWidth} />
      </View>

        {/* Filtro da lista*/}    
      <View style={{ marginTop: 10 }}>
        <InputLupa
          placeholder="Filtrar amigos"
          value={filtro}
          onChangeText={setFiltro}
          style={styles.fullWidth }
        />
        <TouchableOpacity >
          <MaterialCommunityIcons name="menu-down" size={20}></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>

         {/* Lista */ } 
      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={styles.userTitle}>Amigos</Text>
        <FlatListAmigos amigos={amigosFiltrados} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
    marginTop: 8, // <- aproximou os botões
  },
  userTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  erroText: {
    color: "red",
    marginTop: 5,
  },
  sucessoText: {
    color: "green",
    marginTop: 5,
  },
});
