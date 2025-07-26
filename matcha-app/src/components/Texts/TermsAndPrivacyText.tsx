import React from 'react';
import { Text } from 'react-native-paper';

import { TermsAndPrivacyTextProps } from '@/components/Texts/types';
import { styles } from '@/themes/styles';

export default function TermsAndPrivacyText(props: TermsAndPrivacyTextProps) {
  const { showModalTerms, showModalPrivacy } = props;
  return (
    <Text style={styles.termsText}>
      En vous <Text style={styles.boldText}>inscrivant</Text>, vous acceptez nos{' '}
      <Text style={styles.linkText} onPress={showModalTerms}>
        conditions générales
      </Text>{' '}
      et notre{' '}
      <Text style={styles.linkText} onPress={showModalPrivacy}>
        politique de confidentialité
      </Text>
      .
    </Text>
  );
}
