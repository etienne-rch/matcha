import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';

export function AvatarStatic() {
  return (
    <View style={{ alignItems: 'center', marginBottom: rnpTheme.spacing.lg }}>
      <Avatar.Icon
        icon="account"
        size={128}
        style={{ backgroundColor: rnpTheme.colors.avatarBackground }}
      />
    </View>
  );
}
