import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/AuthNavigator";
import Input from "@/components/Input";
import Button from "@/components/Button";
import colors from "@/theme/colors";
import { useAuth } from "@/contexts/AuthContext";

type P = NativeStackScreenProps<AuthStackParamList, "ResetPassword">;

export default function ResetPasswordScreen({ navigation }: P) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const onSubmit = async () => {
    setError("");

    if (!email.trim()) {
      const msg = "Informe o email.";
      setError(msg);
      Alert.alert("Erro", msg);
      return;
    }

    try {
      await resetPassword(email.trim());
      setSent(true);
      Alert.alert(
        "Email enviado",
        "Se existir uma conta com esse email, enviámos um link para redefinir a palavra-passe.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (err: any) {
      console.log(err);
      let msg = "Não foi possível enviar o email de recuperação.";

      if (err.code === "auth/user-not-found") {
        msg = "Não existe utilizador com esse email.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Email inválido.";
      }

      setError(msg);
      Alert.alert("Erro", msg);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.title}>Redefinir palavra-passe</Text>
        <View style={s.divider} />

        <Text style={s.info}>
          Introduza o email associado à sua conta. Vamos enviar um link para
          redefinir a palavra-passe.
        </Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[s.input, !!error && s.inputError]}
        />

        {!!error && <Text style={s.error}>{error}</Text>}

        {sent && (
          <Text style={s.success}>
            Email enviado! Verifique a sua caixa de entrada.
          </Text>
        )}

        <Button title="Enviar link de recuperação" onPress={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.textDark,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    marginTop: 6,
    marginLeft: 4,
  },
  success: {
    color: colors.success ?? "#2e7d32",
    marginTop: 8,
    marginLeft: 4,
  },
});
