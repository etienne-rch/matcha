import { useCallback, useState } from 'react';

export function useModal(initialState = false) {
  const [visible, setVisible] = useState(initialState);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return {
    visible,
    show,
    hide,
    toggle: () => setVisible((prev) => !prev),
  };
}
