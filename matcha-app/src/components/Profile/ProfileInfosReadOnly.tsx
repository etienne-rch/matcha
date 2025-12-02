import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

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
  setEditSection: (
    x:
      | null
      | 'personal'
      | 'address'
      | 'work'
      | 'privacy'
      | 'email'
      | 'password',
  ) => void;
  onSaved: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={{ gap: 24 }}>
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
            data={[{ label: 'Mot de passe', value: '************' }]}
          />
        )}
      </EditableSection>

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
              {
                label: 'Code postal',
                value: user.addressPostalCode ?? '—',
              },
              { label: 'Pays', value: user.addressCountry ?? '—' },
            ]}
          />
        )}
      </EditableSection>

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

      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Suppression du compte</Text>

        <Text style={styles.dangerText}>
          La suppression de ton compte est définitive. Toutes tes données seront
          effacées conformément au RGPD.
        </Text>

        <Button
          mode="outlined"
          onPress={onDelete}
          textColor="#b30000"
          style={styles.deleteButton}
          labelStyle={styles.deleteButtonLabel}
        >
          Supprimer mon compte
        </Button>
      </View>
    </View>
  );
}

function ReadOnlyInfos({ data }: { data: { label: string; value: any }[] }) {
  return (
    <View>
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
  row: { marginBottom: 12 },
  label: { fontSize: 12, color: '#777' },
  value: { fontSize: 15, fontWeight: '600' },

  dangerCard: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#fff4f4',
    borderRadius: 14,
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
  },

  deleteButton: {
    alignSelf: 'flex-start',
    borderColor: '#b30000',
    borderRadius: 999,
  },
  deleteButtonLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
});
