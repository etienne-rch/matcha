import { Avatar } from 'react-native-paper';

import { styles } from '@/themes/styles';

export default function AvatarStatic() {
  return <Avatar.Icon icon="account" size={256} style={styles.avatarStatic} />;
}
