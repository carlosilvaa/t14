import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Keyboard, TouchableOpacity } from 'react-native';
import colors from '@/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type Props = TextInputProps & { label?: string; value?: string; onChangeText?: (text: string) => void };

export default function InputLupa({ label, style, value, onChangeText, ...p }: Props) {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => {
    setFocus(false);
    Keyboard.dismiss();
  };

  const clearText = () => onChangeText?.('');

  return (
    <View style={s.wrap}>
      {label && <Text style={s.label}>{label}</Text>}

      <View style={[s.inputWrap, focus && s.inputWrapFocus]}>
        <TextInput
          {...p}
          style={[s.input, style]}
          placeholderTextColor={colors.label}
          onChangeText={onChangeText}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <View style={s.iconsRight}>
          <EvilIcons name="search" size={20} color={colors.label} />
          {value?.length ? (
            <TouchableOpacity onPress={clearText} style={s.clearIcon}>
              <MaterialIcons name="clear" size={20} color={colors.label} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { marginBottom: 6, fontWeight: '600', color: colors.textDark },

  inputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },

  inputWrapFocus: {
    borderColor: colors.primary, // optional: highlight border on focus
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    color: colors.textDark,
  },

  iconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },

  clearIcon: {
    marginLeft: 8,
  },
});
