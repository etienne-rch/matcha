import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundRadial from '@/components/Background/BackgroundRadial';
import ConfirmDeleteAccountModal from '@/components/Modals/ConfirmDeleteAccountModal';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileInfosReadOnly from '@/components/Profile/ProfileInfosReadOnly';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileScreen({ navigation }: any) {
  const { user, loading, refresh } = useProfile();

  const [editSection, setEditSection] = useState<
    null | 'personal' | 'address' | 'work' | 'privacy' | 'email' | 'password'
  >(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading || !user) return null;

  return (
    <BackgroundRadial>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
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
        </ScrollView>

        <ConfirmDeleteAccountModal
          visible={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => navigation.navigate('Login')}
        />
      </SafeAreaView>
    </BackgroundRadial>
  );
}

const styles = StyleSheet.create({
  bubblesLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    zIndex: 5,
  },
});
