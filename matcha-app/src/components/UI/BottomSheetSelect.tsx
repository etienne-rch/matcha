import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';

export type SelectOption<T> = {
  label: string;
  value: T;
};

interface BottomSheetSelectProps<T> {
  label: string;
  value: T | null;
  options: readonly SelectOption<T>[];
  placeholder?: string;
  onChange: (val: T) => void;
}

export default function BottomSheetSelect<T>({
  label,
  value,
  options,
  placeholder = 'Choisir…',
  onChange,
}: BottomSheetSelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const [tempValue, setTempValue] = useState<T | null>(value);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder;

  const openSheet = () => {
    setTempValue(value);
    setVisible(true);
  };

  const closeSheet = () => setVisible(false);

  const confirm = () => {
    if (tempValue != null) onChange(tempValue);
    closeSheet();
  };

  return (
    <>
      <Pressable onPress={openSheet}>
        <TextInput
          label={label}
          mode="outlined"
          value={selectedLabel}
          editable={false}
          pointerEvents="none"
          style={styles.input}
        />
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={closeSheet}>
          <View />
        </Pressable>

        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>{label}</Text>

          <FlatList
            data={options}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              const isSelected = item.value === tempValue;
              return (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setTempValue(item.value)}
                >
                  <Text style={styles.optionLabel}>{item.label}</Text>

                  <View
                    style={[
                      styles.selectorCircle,
                      isSelected && styles.selectorCircleSelected,
                    ]}
                  />
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.actions}>
            <Button mode="text" onPress={closeSheet} textColor="#666">
              Annuler
            </Button>
            <Button
              mode="contained"
              onPress={confirm}
              style={styles.confirmButton}
            >
              Valider
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: rnpTheme.colors.background,
    marginBottom: rnpTheme.spacing.md,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: rnpTheme.colors.primary,
  },
  optionRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
  },
  selectorCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectorCircleSelected: {
    borderColor: rnpTheme.colors.greenDark.normal,
    backgroundColor: rnpTheme.colors.greenLight.light.active,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  confirmButton: {
    borderRadius: 8,
  },
});
