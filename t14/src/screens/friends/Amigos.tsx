import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import FlatListAmigos, { Amigo } from "@/components/FlatListAmigos";
import InputLupa from "@/components/InputLupa";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "react-native-paper";

interface AmigosProps {
  navigation: any;
}

const AMIGOS_DATA: Amigo[] = [
  { id: '1', primeiroNome: 'João', apelido: 'Silva', nickname: 'joaos', email: 'joao.silva@example.com', telefone: '+55 11 99999-9999', estado: 'ativo', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', primeiroNome: 'Maria', apelido: 'Souza', nickname: 'mariinhaz', email: 'maria.souza@example.com', telefone: '+55 21 98888-8888', estado: 'pendente', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', primeiroNome: 'Carlos', apelido: 'Ferreira', nickname: 'cferreira', email: 'carlos.ferreira@example.com', telefone: '+55 31 97777-7777', estado: 'ativo', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', primeiroNome: 'Ana', apelido: 'Pereira', nickname: 'anap', email: 'ana.pereira@example.com', telefone: '+351 914222444', estado: 'pendente', avatar: 'https://i.pravatar.cc/150?img=4' },
];

export default function Amigos({ navigation }: AmigosProps) {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [filtro, setFiltro] = useState("");
  
  const[mensagem,setMensagem] = useState("") //Mensagem para utilizadores pendentes
  const[tipoMensagem,setTipoMensagem] = useState<"sucesso" | "erro">("sucesso");



  // Modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [SelectedAmigo, setSelectedAmigo] = useState<Amigo | null>(null);

  const abrirDetalhes = (amigo: Amigo) => {
    setSelectedAmigo(amigo);
    setModalVisible(true);
  };

  const fecharDetalhes = () => {
    setSelectedAmigo(null);
    setModalVisible(false);
  };

  //Mensagem de adicao ou remocao de amigos pendentes
  const handleAdicionarPendente = (amigo:Amigo) => {
    if(amigo.estado === "pendente"){
        setMensagem(`O utilizador pendente ${amigo.primeiroNome} ${amigo.apelido} foi adcionado com sucesso`);
        setTipoMensagem("sucesso");
    }
  }; 
   const handleRemoverPendente = (amigo:Amigo) => {
    if(amigo.estado === "pendente"){
        setMensagem(`O utilizador pendente ${amigo.primeiroNome} ${amigo.apelido} foi adcionado com sucesso`);
        setTipoMensagem("erro");
   } 
 };

  const validarEmail = (email: string): string => {
    const regex = /^[^@\s]+@([^@\s]+\.)+.+$/;
    if (!regex.test(email.trim())) return "Formato de e-mail inválido. Ex: utilizador@edu.pt";
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
      {/* Input email */}
      <View>
        <InputLupa
          placeholder="Digite o email do amigo"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.fullWidth,
            { borderColor: corBorda, borderWidth: 1, borderRadius: 5 },
          ]}
        />
        {erro ? <Text style={styles.erroText}>{erro}</Text> : null}
        {sucesso ? <Text style={styles.sucessoText}>{sucesso}</Text> : null}
      </View>

      {/* Botões */}
      <View style={[styles.container, { marginTop: 2 }]}>
        <Button title="Enviar Convite" style={styles.fullWidth} onPress={handleEnviarConvite} />
        <IconButton style={styles.fullWidth} />
      </View>

      {/* Filtro */}
      <View style={{ marginTop: 10 }}>
        <InputLupa
          placeholder="Filtrar amigos"
          value={filtro}
          onChangeText={setFiltro}
          style={styles.fullWidth}
        />
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu-down" size={20} />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={styles.userTitle}>Amigos</Text>
        <FlatListAmigos amigos={amigosFiltrados} onPressItem={abrirDetalhes} />
      </View>

      {/* Modal */}
      {SelectedAmigo && (
        <Modal visible={modalVisible} animationType="slide" onRequestClose={fecharDetalhes}>
          <View style={modalStyles.container}>
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
              <Text style={modalStyles.title}>Perfil do Amigo</Text>
              <View style={modalStyles.divider} />
            </View>

            <View style={modalStyles.card}>
              <Avatar.Image size={100} source={{ uri: SelectedAmigo.avatar }} style={modalStyles.avatar} />

              <Row icon={<MaterialCommunityIcons name="account-outline" size={20} color="#111827" />} label="Nome" value={`${SelectedAmigo.primeiroNome} ${SelectedAmigo.apelido}`} />
              <Row icon={<MaterialCommunityIcons name="account-circle-outline" size={20} color="#111827" />} label="Nickname" value={SelectedAmigo.nickname} />
              <Row icon={<MaterialCommunityIcons name="email-outline" size={20} color="#111827" />} label="Email" value={SelectedAmigo.email} />
              <Row icon={<MaterialCommunityIcons name="phone-outline" size={20} color="#111827" />} label="Telefone" value={SelectedAmigo.telefone} />
              <Row icon={<MaterialCommunityIcons name="check-circle-outline" size={20} color="#111827" />} label="Estado" value={SelectedAmigo.estado.toUpperCase()} />
            </View>

            <TouchableOpacity onPress={fecharDetalhes} style={modalStyles.closeButton}>
              <Text style={modalStyles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

/* Componente Row */
function Row({
  icon,
  label,
  value,
  right,
  chevron,
  onPress,
  labelStyle,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  right?: React.ReactNode;
  chevron?: boolean;
  onPress?: () => void;
  labelStyle?: object;
}) {
  const Content = (
    <View style={rowStyles.inner}>
      <View style={rowStyles.left}>
        <View style={rowStyles.iconWrap}>{icon}</View>
        <Text style={[rowStyles.label, labelStyle]}>{label}</Text>
      </View>

      <View style={rowStyles.right}>
        {value ? <Text style={rowStyles.value}>{value}</Text> : null}
        {right}
        {chevron ? (
          <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" style={{ marginLeft: 6 }} />
        ) : null}
      </View>
    </View>
  );

  if (onPress) return <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={rowStyles.row}>{Content}</TouchableOpacity>;
  return <View style={rowStyles.row}>{Content}</View>;
}

const rowStyles = StyleSheet.create({
  row: { paddingHorizontal: 10, minHeight: 56, justifyContent: "center" },
  inner: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  left: { flexDirection: "row", alignItems: "center" },
  iconWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#EEF2F6", alignItems: "center", justifyContent: "center", marginRight: 10 },
  label: { fontSize: 16, color: "#111827" },
  right: { flexDirection: "row", alignItems: "center" },
  value: { color: "#6B7280" },
});

const styles = StyleSheet.create({
  window: { flex: 1, padding: 20, backgroundColor: "#fff" },
  container: { width: "100%" },
  fullWidth: { width: "100%", marginTop: 8 },
  userTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  erroText: { color: "red", marginTop: 5 },
  sucessoText: { color: "green", marginTop: 5 },
});

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  title: { fontSize: 22, fontWeight: "800", color: "#111827", textAlign: "center", marginTop: 4, marginBottom: 10 },
  divider: { height: 1, backgroundColor: "#D1D5DB", opacity: 0.7 },
  card: { backgroundColor: "#fff", borderRadius: 16, marginHorizontal: 16, paddingHorizontal: 6, paddingVertical: 6, 
      borderWidth: 1, borderColor: "#D1D5DB", marginTop: 10 },

  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 16 },
  
  closeButton: { marginTop: 20, alignSelf: "center", paddingVertical: 8, paddingHorizontal: 16, 
    backgroundColor: "#334B34", borderRadius: 8 },

  closeText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
