import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EditableSection from '@/components/UI/EditableSection';
import { UserFull } from '@/types/user';

import ProfileSections from './ProfileSections';

export default function ProfileInfosReadOnly({
  user,
  editSection,
  setEditSection,
  onSaved,
  onDelete,
}: {
  user: UserFull;
  editSection:
    | null
    | 'personal'
    | 'address'
    | 'work'
    | 'privacy'
    | 'email'
    | 'password';
  setEditSection: (x: any) => void;
  onSaved: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={{ marginTop: 10 }}>
      {/* PERSONAL */}
      <EditableSection
        title="Informations personnelles"
        isEditing={editSection === 'personal'}
        onEdit={() => setEditSection('personal')}
      >
        {editSection === 'personal' ? (
          <ProfileSections
            section="personal"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[
              { label: 'Prénom', value: user.firstName },
              { label: 'Nom', value: user.lastName },
              { label: 'Naissance', value: user.birthYear ?? '—' },
              { label: 'Genre', value: formatGender(user.gender) },
            ]}
          />
        )}
      </EditableSection>

      {/* EMAIL */}
      <EditableSection
        title="Adresse e-mail"
        isEditing={editSection === 'email'}
        onEdit={() => setEditSection('email')}
      >
        {editSection === 'email' ? (
          <ProfileSections
            section="email"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[
              { label: 'Adresse e-mail', value: user.email },
              {
                label: 'Vérification',
                value: user.isEmailVerified ? 'Vérifiée' : 'Non vérifiée',
              },
            ]}
          />
        )}
      </EditableSection>

      {/* PASSWORD */}
      <EditableSection
        title="Mot de passe"
        isEditing={editSection === 'password'}
        onEdit={() => setEditSection('password')}
      >
        {editSection === 'password' ? (
          <ProfileSections
            section="password"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[{ label: 'Mot de passe', value: '*************' }]}
          />
        )}
      </EditableSection>

      {/* ADDRESS */}
      <EditableSection
        title="Adresse"
        isEditing={editSection === 'address'}
        onEdit={() => setEditSection('address')}
      >
        {editSection === 'address' ? (
          <ProfileSections
            section="address"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[
              { label: 'Rue', value: user.addressStreet ?? '—' },
              { label: 'Ville', value: user.addressCity ?? '—' },
              { label: 'Code postal', value: user.addressPostalCode ?? '—' },
              { label: 'Pays', value: user.addressCountry ?? '—' },
            ]}
          />
        )}
      </EditableSection>

      {/* WORK */}
      <EditableSection
        title="Préférences de travail"
        isEditing={editSection === 'work'}
        onEdit={() => setEditSection('work')}
      >
        {editSection === 'work' ? (
          <ProfileSections
            section="work"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[
              { label: 'Mode', value: formatLocationPref(user.locationPref) },
              {
                label: 'Télétravail',
                value:
                  user.remote === true
                    ? 'Oui'
                    : user.remote === false
                      ? 'Non'
                      : '—',
              },
            ]}
          />
        )}
      </EditableSection>

      {/* PRIVACY */}
      <EditableSection
        title="Confidentialité & RGPD"
        isEditing={editSection === 'privacy'}
        onEdit={() => setEditSection('privacy')}
      >
        {editSection === 'privacy' ? (
          <ProfileSections
            section="privacy"
            user={user}
            onCancel={() => setEditSection(null)}
            onSaved={onSaved}
          />
        ) : (
          <ReadOnlyInfos
            data={[
              {
                label: 'Consentement RGPD',
                value: user.consentAccepted ? 'Accepté' : 'Refusé',
              },
            ]}
          />
        )}
      </EditableSection>

      {/* DELETE ACCOUNT */}
      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Suppression du compte</Text>

        <Text style={styles.dangerText}>
          La suppression de ton compte est définitive. Toutes tes données seront
          effacées.
        </Text>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonLabel}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ReadOnlyInfos({ data }: { data: { label: string; value: any }[] }) {
  return (
    <View style={styles.readOnlyWrapper}>
      {data.map((row, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

function formatGender(g?: string) {
  const map: Record<string, string> = {
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    undisclosed: 'Non renseigné',
  };
  return g ? map[g] : '—';
}

function formatLocationPref(t?: string) {
  const map: Record<string, string> = {
    remote: 'Télétravail',
    hybrid: 'Hybride',
    'on-site': 'Sur site',
  };
  return t ? map[t] : '—';
}

const styles = StyleSheet.create({
  readOnlyWrapper: {
    gap: 10,
  },

  row: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#062314',
    marginTop: 2,
  },

  dangerCard: {
    backgroundColor: '#fff5f5',
    padding: 20,
    borderRadius: 14,
    marginTop: 18,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b30000',
    marginBottom: 8,
  },
  dangerText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 16,
    lineHeight: 19,
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: '#b30000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  deleteButtonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b30000',
  },
});
