
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Root from '@/navigation/RootNavigator';
import { AuthProvider } from '@/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
// Versão final com o contexto de autenticação e navegação
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Root />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
