import React, { useState } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConfirmDeleteAccountModal from '@/components/Modals/ConfirmDeleteAccountModal';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileInfosReadOnly from '@/components/Profile/ProfileInfosReadOnly';
import { useProfile } from '@/hooks/useProfile';
import { styles } from '@/themes/styles';

export default function ProfileScreen({ navigation }: any) {
  const { user, loading, refresh } = useProfile();

  const [editSection, setEditSection] = useState<
    null | 'personal' | 'address' | 'work' | 'privacy' | 'email' | 'password'
  >(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading || !user) return null;

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/default.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ProfileHeader user={user} />

          <ProfileInfosReadOnly
            user={user}
            editSection={editSection}
            setEditSection={setEditSection}
            onSaved={async () => {
              await refresh();
              setEditSection(null);
            }}
            onDelete={() => setShowDeleteModal(true)}
          />

          <ConfirmDeleteAccountModal
            visible={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
