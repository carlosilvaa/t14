import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import Filter from "@/components/Filter";

type Grupo = {
  id: string;
  title: string;
  status: string;
  descricao: string;
  despesas: number;
};

const OPCOES = [
  { id: "1", opcao: "Contas liquidadas" },
  { id: "2", opcao: "Contas por liquidar" },
  { id: "3", opcao: "Estou devendo" },
  { id: "4", opcao: "Me devem" },
];

const GRUPO: Grupo[] = [
  {
    id: "1",
    title: "Viagem para Madrid",
    status: "Por liquidar",
    descricao: "Teste",
    despesas: 2,
  },
  {
    id: "2",
    title: "Lanche",
    status: "Liquidado",
    descricao: "Exemplo",
    despesas: 2,
  },
  {
    id: "3",
    title: "Londres",
    status: "Liquidada parcialmente",
    descricao: "Exemplo 2",
    despesas: 2,
  },
];

export default function Grupos({ navigation }: any) {
  const [pesquisar, setPesquisar] = useState<string>();
  const [filtro, setFiltro] = useState<string | null>(null);

  const gruposFiltrados = GRUPO.filter(grupo => {
    const correspondeFiltro = filtro ? grupo.status === filtro : true;
    const correspondePesquisa = pesquisar
      ? grupo.title.toLowerCase().includes(pesquisar.toLowerCase())
      : true;
    return correspondeFiltro && correspondePesquisa;
  });

  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <Input
          placeholder="Pesquisar grupos..."
          value={pesquisar}
          onChangeText={setPesquisar}
          style={{ width: 325 }}
        />
        <Filter valor={filtro} onChange={setFiltro} opcoes={OPCOES} />
      </View>

      <FlatList
        data={gruposFiltrados}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <GroupItem item={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          title={<Ionicons name="add" size={24} color="#fff" />}
          onPress={() => navigation.navigate("GrupoForm")}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
}

function GroupItem({ item, navigation }: { item: Grupo; navigation: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={s.activityCard}
      onPress={() =>
        navigation.navigate("DetalhesGrupo", { grupoId: item.id, title: item.title })
      }
    >
      <View style={s.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={s.activityTitle}>{item.title}</Text>
        <Text style={s.activitySub}>
          {item.status} • {item.despesas} despesas
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("GrupoForm", { modo: "editar", grupo: item })}
      >
        <Ionicons name="pencil" size={18} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F2EAD9",
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textDark,
  },
  activitySub: {
    color: "#6B7280",
    marginTop: 2,
  },
  input: { borderColor: colors.border, backgroundColor: colors.background, borderRadius: 14 },
  topRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
    zIndex: 100,
  },
});
