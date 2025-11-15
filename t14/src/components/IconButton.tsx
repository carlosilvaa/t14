import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
   style?: any;
};

export default function IconButton({ onPress, disabled, loading }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled && styles.disabled]}
      onPress={onPress}
      disabled={!!disabled || !!loading}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <View style={styles.content}>
          <Feather
            name="link"
            size={20}
            color="#000" // ícone preto
            style={styles.icon}
          />
          <Text style={styles.text}>Convidar via link</Text> {/* texto preto */}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff', // botão branco
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 14,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#000', // borda preta
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#000', // texto preto
    fontWeight: '700',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
