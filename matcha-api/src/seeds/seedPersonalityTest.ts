import PersonalityTemplate from '@/models/PersonalityTemplate';

export const seedPersonalityTest = async () => {
  const existing = await PersonalityTemplate.findOne({ isActive: true });
  if (existing) return;

  await PersonalityTemplate.create({
    title: 'Test de personnalité Matcha',
    summary:
      'Identifie ton profil professionnel selon 4 dimensions (Extraversion / Introversion, Sensation / Intuition, Pensée / Sentiment, Jugement / Perception). Inspiré du modèle MBTI, adapté aux environnements professionnels.',
    isActive: true,
    version: '1.0',
    profiles: [
      {
        key: 'INTJ',
        label: 'Stratège',
        description:
          'Visionnaire et analytique, aime planifier sur le long terme et optimiser les systèmes.',
        strengths: ['Planificateur', 'Indépendant', 'Analytique', 'Curieux'],
        weaknesses: ['Perfectionniste', 'Distant émotionnellement'],
        recommendedJobs: [
          'Consultant stratégie',
          'Ingénieur',
          'Data Scientist',
        ],
      },
      {
        key: 'INTP',
        label: 'Penseur',
        description:
          'Cherche la logique et la cohérence avant tout. Adore comprendre les concepts complexes.',
        strengths: ['Innovant', 'Curieux', 'Logique', 'Indépendant'],
        weaknesses: ['Indécis', 'Distrait'],
        recommendedJobs: ['Chercheur', 'Développeur', 'Analyste'],
      },
      {
        key: 'ENTJ',
        label: 'Leader',
        description:
          'Naturellement tourné vers la prise de décision et la réalisation d’objectifs ambitieux.',
        strengths: ['Charismatique', 'Décisif', 'Efficace'],
        weaknesses: ['Autoritaire', 'Impatient'],
        recommendedJobs: ['Manager', 'Entrepreneur', 'Chef de projet'],
      },
      {
        key: 'ENTP',
        label: 'Innovateur',
        description:
          'Curieux et énergique, aime remettre en question le statu quo et explorer de nouvelles idées.',
        strengths: ['Créatif', 'Rapide d’esprit', 'Adaptable'],
        weaknesses: ['Inconstant', 'Impatient'],
        recommendedJobs: ['Consultant', 'Stratège produit', 'Entrepreneur'],
      },
      {
        key: 'INFJ',
        label: 'Conseiller',
        description:
          'Empathique et réfléchi, cherche à aider les autres à trouver du sens à leur travail.',
        strengths: ['Visionnaire', 'Bienveillant', 'Motivé par une mission'],
        weaknesses: ['Idéaliste', 'Réservé'],
        recommendedJobs: ['Coach', 'Thérapeute', 'Responsable RH'],
      },
      {
        key: 'INFP',
        label: 'Médiateur',
        description:
          'Guidé par des valeurs fortes, motivé par la créativité et le sens.',
        strengths: ['Empathique', 'Créatif', 'Loyal'],
        weaknesses: ['Trop sensible', 'Fuit le conflit'],
        recommendedJobs: ['Rédacteur', 'Designer', 'Psychologue'],
      },
      {
        key: 'ENFJ',
        label: 'Motivateur',
        description:
          'Charismatique et altruiste, aide les autres à grandir et à coopérer efficacement.',
        strengths: ['Sociable', 'Inspirant', 'Organisé'],
        weaknesses: ['Trop impliqué', 'Besoin de reconnaissance'],
        recommendedJobs: [
          'Formateur',
          'Manager RH',
          'Responsable communication',
        ],
      },
      {
        key: 'ENFP',
        label: 'Explorateur',
        description:
          'Énergique et imaginatif, aime l’innovation et le contact humain.',
        strengths: ['Créatif', 'Curieux', 'Chaleureux'],
        weaknesses: ['Désorganisé', 'Facilement distrait'],
        recommendedJobs: ['Publicitaire', 'Entrepreneur', 'Community Manager'],
      },
      {
        key: 'ISTJ',
        label: 'Administrateur',
        description:
          'Fiable et méthodique, aime les environnements structurés et les faits concrets.',
        strengths: ['Responsable', 'Pragmatique', 'Ponctuel'],
        weaknesses: ['Rigide', 'Peu flexible'],
        recommendedJobs: ['Comptable', 'Auditeur', 'Chef de projet technique'],
      },
      {
        key: 'ISFJ',
        label: 'Protecteur',
        description:
          'Attentionné, loyal et consciencieux, aime rendre service et apporter du soutien.',
        strengths: ['Empathique', 'Patient', 'Fiable'],
        weaknesses: ['Réservé', 'Réticent au changement'],
        recommendedJobs: ['Infirmier', 'Enseignant', 'RH'],
      },
      {
        key: 'ESTJ',
        label: 'Directeur',
        description:
          'Organisé et franc, excelle dans la gestion et la mise en œuvre de plans concrets.',
        strengths: ['Efficace', 'Décisif', 'Structuré'],
        weaknesses: ['Autoritaire', 'Rigide'],
        recommendedJobs: ['Manager', 'Chef de service', 'Administrateur'],
      },
      {
        key: 'ESFJ',
        label: 'Coordinateur',
        description:
          'Sociable et attentif aux besoins des autres, cherche l’harmonie et la coopération.',
        strengths: ['Soutenant', 'Fiable', 'Sociable'],
        weaknesses: ['Besoin d’approbation', 'Trop conciliant'],
        recommendedJobs: ['Assistant social', 'RH', 'Enseignant'],
      },
      {
        key: 'ISTP',
        label: 'Artisan',
        description:
          'Calme et logique, aime résoudre les problèmes concrets avec ses mains ou ses outils.',
        strengths: ['Pragmatique', 'Indépendant', 'Curieux'],
        weaknesses: ['Impulsif', 'Réservé'],
        recommendedJobs: ['Technicien', 'Développeur', 'Mécanicien'],
      },
      {
        key: 'ISFP',
        label: 'Artiste',
        description:
          'Créatif et sensible, cherche l’harmonie et la beauté dans son travail.',
        strengths: ['Créatif', 'Empathique', 'Adaptable'],
        weaknesses: ['Indécis', 'Introverti'],
        recommendedJobs: ['Designer', 'Artisan', 'Photographe'],
      },
      {
        key: 'ESTP',
        label: 'Dynamique',
        description:
          'Aventurier et pragmatique, aime passer à l’action et vivre l’instant présent.',
        strengths: ['Audacieux', 'Énergique', 'Orienté résultats'],
        weaknesses: ['Impulsif', 'Impatient'],
        recommendedJobs: ['Commercial', 'Entrepreneur', 'Coach sportif'],
      },
      {
        key: 'ESFP',
        label: 'Ambassadeur',
        description:
          'Chaleureux et expressif, aime divertir et motiver les autres.',
        strengths: ['Sociable', 'Optimiste', 'Spontané'],
        weaknesses: ['Désorganisé', 'Émotif'],
        recommendedJobs: ['Animateur', 'Vendeur', 'Comédien'],
      },
    ],

    questions: [
      // E vs I
      {
        id: 'q1',
        text: 'Je me ressource au contact des autres.',
        dimension: 'EI',
        options: likert(),
      },
      {
        id: 'q2',
        text: 'Je préfère travailler seul que collaborer en groupe.',
        dimension: 'EI',
        options: likert(true),
      },
      {
        id: 'q3',
        text: 'Je parle souvent avant de réfléchir.',
        dimension: 'EI',
        options: likert(),
      },
      {
        id: 'q4',
        text: 'Je préfère écouter plutôt que prendre la parole.',
        dimension: 'EI',
        options: likert(true),
      },
      {
        id: 'q5',
        text: 'Les environnements dynamiques me stimulent.',
        dimension: 'EI',
        options: likert(),
      },
      {
        id: 'q6',
        text: 'Les réunions me fatiguent rapidement.',
        dimension: 'EI',
        options: likert(true),
      },

      // S vs N
      {
        id: 'q7',
        text: 'Je me fie davantage aux faits qu’à mon intuition.',
        dimension: 'SN',
        options: likert(true),
      },
      {
        id: 'q8',
        text: 'J’aime explorer des idées abstraites.',
        dimension: 'SN',
        options: likert(),
      },
      {
        id: 'q9',
        text: 'Je préfère les tâches concrètes et mesurables.',
        dimension: 'SN',
        options: likert(true),
      },
      {
        id: 'q10',
        text: 'Je me projette facilement dans le futur.',
        dimension: 'SN',
        options: likert(),
      },
      {
        id: 'q11',
        text: 'Je remarque les détails avant tout.',
        dimension: 'SN',
        options: likert(true),
      },
      {
        id: 'q12',
        text: 'Je fais souvent confiance à mon instinct.',
        dimension: 'SN',
        options: likert(),
      },

      // T vs F
      {
        id: 'q13',
        text: 'Je me base sur la logique avant de prendre une décision.',
        dimension: 'TF',
        options: likert(true),
      },
      {
        id: 'q14',
        text: 'Je prends en compte l’impact émotionnel de mes choix.',
        dimension: 'TF',
        options: likert(),
      },
      {
        id: 'q15',
        text: 'Je préfère être juste que gentil.',
        dimension: 'TF',
        options: likert(true),
      },
      {
        id: 'q16',
        text: 'Je m’assure que tout le monde se sente bien avant de décider.',
        dimension: 'TF',
        options: likert(),
      },
      {
        id: 'q17',
        text: 'Je valorise la logique plus que l’harmonie.',
        dimension: 'TF',
        options: likert(true),
      },
      {
        id: 'q18',
        text: 'Je suis sensible aux émotions des autres.',
        dimension: 'TF',
        options: likert(),
      },

      // J vs P
      {
        id: 'q19',
        text: 'Je planifie toujours avant d’agir.',
        dimension: 'JP',
        options: likert(true),
      },
      {
        id: 'q20',
        text: 'Je préfère improviser plutôt que planifier.',
        dimension: 'JP',
        options: likert(),
      },
      {
        id: 'q21',
        text: 'Je respecte les délais à la lettre.',
        dimension: 'JP',
        options: likert(true),
      },
      {
        id: 'q22',
        text: 'Je m’adapte facilement aux imprévus.',
        dimension: 'JP',
        options: likert(),
      },
      {
        id: 'q23',
        text: 'J’aime suivre une routine stable.',
        dimension: 'JP',
        options: likert(true),
      },
      {
        id: 'q24',
        text: 'Je préfère garder mes options ouvertes.',
        dimension: 'JP',
        options: likert(),
      },
    ],
  });

  console.log('✅ Test de personnalité complet seedé avec succès');
};

// Helper Likert scale
function likert(reverse = false) {
  const base = [
    { value: -2, label: 'Pas du tout d’accord' },
    { value: -1, label: 'Plutôt pas d’accord' },
    { value: 0, label: 'Neutre' },
    { value: 1, label: 'Plutôt d’accord' },
    { value: 2, label: 'Tout à fait d’accord' },
  ];
  return reverse ? base.map((o) => ({ ...o, value: -o.value })) : base;
}
