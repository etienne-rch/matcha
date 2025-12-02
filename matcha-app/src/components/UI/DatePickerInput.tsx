import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';

interface DatePickerInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minimumYear?: number;
  maximumYear?: number;
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  minimumYear = 1900,
  maximumYear,
}: DatePickerInputProps) {
  const [show, setShow] = useState(false);

  const now = new Date();
  const maxDate = new Date(
    maximumYear ?? now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const minDate = new Date(minimumYear, 0, 1);

  const displayValue = value ? formatDate(value) : '';

  const onChangeInternal = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (event.type === 'dismissed') return;
    if (!selectedDate) return;

    onChange(selectedDate);
  };

  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          label={label}
          mode="outlined"
          value={displayValue}
          editable={false}
          pointerEvents="none"
          style={styles.input}
          right={<TextInput.Icon icon="calendar" />}
        />
      </Pressable>

      {show && (
        <DateTimePicker
          value={value ?? new Date(1990, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeInternal}
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      )}
    </View>
  );
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatDate(date: Date): string {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${pad(d)}/${pad(m)}/${y}`;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: rnpTheme.colors.background,
    marginBottom: rnpTheme.spacing.md,
  },
});
