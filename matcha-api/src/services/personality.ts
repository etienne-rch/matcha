import PersonalityTemplate from '@/models/PersonalityTemplate';
import PersonalityTest from '@/models/PersonalityTest';

interface Answer {
  questionId: string;
  value: number; // -2 à +2
}

export async function computePersonality(userId: string, answers: Answer[]) {
  const template = await PersonalityTemplate.findOne({ isActive: true });
  if (!template) throw new Error('Aucun test actif trouvé.');

  // Initialisation des dimensions principales
  const scores: Record<'EI' | 'SN' | 'TF' | 'JP', number> = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  // Calcul du score pour chaque dimension
  for (const ans of answers) {
    const q = template.questions.find((q: any) => q.id === ans.questionId);
    if (q && q.dimension && scores[q.dimension] !== undefined) {
      scores[q.dimension] += ans.value;
    }
  }

  // Détermination du type MBTI à partir du signe de chaque score
  const type =
    (scores.EI >= 0 ? 'E' : 'I') +
    (scores.SN >= 0 ? 'S' : 'N') +
    (scores.TF >= 0 ? 'T' : 'F') +
    (scores.JP >= 0 ? 'J' : 'P');

  // Recherche du profil associé
  const profile = template.profiles.find((p: any) => p.key === type);

  // Sauvegarde du test complet
  const test = await PersonalityTest.create({
    userId,
    templateId: template._id,
    templateVersion: template.version,
    answers,
    scoreBreakdown: scores,
    type,
    result: profile?.label ?? 'Profil neutre',
    traits: profile ? [profile.label, ...(profile.strengths ?? [])] : [],
    motivationProfile: profile?.recommendedJobs ?? [],
  });

  // Retourne un résumé structuré
  return {
    type,
    label: profile?.label ?? 'Profil neutre',
    description: profile?.description,
    strengths: profile?.strengths ?? [],
    weaknesses: profile?.weaknesses ?? [],
    recommendedJobs: profile?.recommendedJobs ?? [],
    scoreBreakdown: scores,
    testId: test._id,
  };
}
