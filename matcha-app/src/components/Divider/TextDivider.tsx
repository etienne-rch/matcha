import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { TextDividerProps } from '@/components/Divider/types';
import { styles } from '@/themes/styles';

export default function TextDivider(props: TextDividerProps) {
  const { text } = props;
  return (
    <View style={styles.dividerContainer}>
      <Divider style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
}
