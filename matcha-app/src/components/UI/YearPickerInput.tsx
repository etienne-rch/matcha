import React from 'react';

import BottomSheetSelect from '@/components/UI/BottomSheetSelect';

interface YearPickerInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minimumYear?: number;
  maximumYear?: number;
}

export default function YearPickerInput({
  label,
  value,
  onChange,
  minimumYear = 1900,
  maximumYear,
}: YearPickerInputProps) {
  const currentYear = new Date().getFullYear();
  const max = maximumYear ?? currentYear;

  const years = [];
  for (let y = max; y >= minimumYear; y--) {
    years.push({ label: String(y), value: y });
  }

  return (
    <BottomSheetSelect<number>
      label={label}
      value={value ? value.getFullYear() : null}
      onChange={(year) => {
        if (!year) return onChange(null);
        onChange(new Date(year, 0, 1));
      }}
      options={years}
    />
  );
}
