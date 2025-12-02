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
import Input from "@/components/Input";
import Button from "@/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/AuthNavigator";
import colors from "@/theme/colors";
import { useAuth } from "@/contexts/AuthContext"; // vamos usar register do contexto

type P = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: P) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [conf, setConf] = useState("");
  const [mismatch, setMismatch] = useState(false);
 const { register, registering } = useAuth();

  const onSubmit = async () => {
  const mis = pwd !== conf;
  setMismatch(mis);
  if (mis) {
    Alert.alert("As palavras-passe não coincidem");
    return;
  }

  if (!first || !last || !email || !pwd) {
    Alert.alert("Preencha todos os campos");
    return;
  }

  const fullName = `${first.trim()} ${last.trim()}`;
  const trimmedEmail = email.trim();

  try {
    await register(fullName, trimmedEmail, pwd);

    Alert.alert(
      "Conta criada!",
      "Conta criada com sucesso. Pode agora iniciar sessão.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  } catch (err: any) {
    console.log(err);
    let msg = "Não foi possível criar a conta.";

    if (err.code === "auth/email-already-in-use") {
      msg = "Já existe uma conta com esse email.";
    } else if (err.code === "auth/invalid-email") {
      msg = "Email inválido.";
    } else if (err.code === "auth/weak-password") {
      msg = "A palavra-passe é demasiado fraca.";
    }

    Alert.alert("Erro no registo", msg);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.title}>Registo</Text>
        <View style={s.divider} />

        <Input
          label="Primeiro Nome"
          value={first}
          onChangeText={setFirst}
          style={s.input}
        />
        <Input
          label="Apelido"
          value={last}
          onChangeText={setLast}
          style={s.input}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={s.input}
        />
        <Input
          label="Palavra-passe"
          value={pwd}
          onChangeText={setPwd}
          secureTextEntry
          style={s.input}
        />
        <Input
          label="Confirmar palavra-passe"
          value={conf}
          onChangeText={(t) => {
            setConf(t);
            setMismatch(pwd !== t);
          }}
          secureTextEntry
          style={[s.input, mismatch && s.inputError]}
        />
        {mismatch && (
          <Text style={s.error}>As palavras-passe não coincidem</Text>
        )}

        <Button title="Criar conta" onPress={onSubmit} loading={registering} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24, backgroundColor: colors.background },
  title: { fontSize: 32, fontWeight: "800", color: colors.textDark, textAlign: "center", marginTop: 8, marginBottom: 8 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 12, marginHorizontal: 4 },
  input: { borderColor: colors.border, borderRadius: 14, backgroundColor: colors.background },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, marginTop: 6, marginLeft: 4 },
});
