import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

type Notification = {
  autor: string;
  email: string;
  assunto: string;
  corpo: string;
  time: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    autor: "João",
    email: "j1@gmail.com",
    assunto: "Adição de membro no grupo",
    corpo: "Convite enviado com sucesso.",
    time: "hoje",
  },
  {
    autor: "Migas",
    email: "migas@gmail.com",
    assunto: "Liquidação parcial",
    corpo: "Migas liquidou 12€ da despesa Viagem.",
    time: "ontem",
  },
];

export default function Notificacoes() {
  return (
    <View style={s.container}>
      <Text style={s.sectionTitle}>Atividade recente</Text>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

function NotificationItem({ item }: { item: Notification }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={s.activityCard}>
      <View style={s.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={s.activityTitle}>{item.assunto}</Text>

        <Text style={s.activitySub}>
          {item.autor} • {item.time}
        </Text>

        <Text style={s.activitySub}>{item.email}</Text>

        <Text style={s.activityBody}>{item.corpo}</Text>
      </View>

      <Ionicons name="create-outline" size={20} color={colors.primary} />
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
  sectionTitle: {
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
    fontSize: 18,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    marginBottom: 4,
  },
  activityBody: {
    color: colors.textDark,
    fontSize: 14,
  },
});
