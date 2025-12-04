// src/screens/auth/VerifyCodeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/theme/colors";

type P = NativeStackScreenProps<AuthStackParamList, "VerifyCode">;

export default function VerifyCodeScreen({ route, navigation }: P) {
  const { email, name, password } = route.params;
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { confirmRegistration } = useAuth();

  const onConfirm = async () => {
    if (code.length !== 6) {
      Alert.alert("Código inválido", "O código deve ter 6 dígitos.");
      return;
    }

    try {
      setSubmitting(true);
      await confirmRegistration(email, name, password, code);

      Alert.alert("Conta ativada!", "Pode agora iniciar sessão.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (err: any) {
      console.log(err);
      let msg = "Não foi possível ativar a conta.";
      if (err.code === "auth/invalid-verification-code") {
        msg = "Código incorreto. Verifique o código enviado por email.";
      }
      Alert.alert("Erro", msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={s.container}>
        <Text style={s.title}>Verificar email</Text>
        <Text style={s.subtitle}>
          Enviámos um código de 6 dígitos para {"\n"}
          <Text style={s.email}>{email}</Text>
        </Text>

        <Input
          label="Código de verificação"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          style={s.input}
        />

        <Button
          title="Confirmar"
          onPress={onConfirm}
          loading={submitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.textDark,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  email: {
    fontWeight: "600",
    color: colors.textDark,
  },
  input: {
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 14,
  },
});
