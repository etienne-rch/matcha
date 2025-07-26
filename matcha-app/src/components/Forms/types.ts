export type RegistrationFormProps = {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  setNom: (value: string) => void;
  setPrenom: (value: string) => void;
  setEmail: (value: string) => void;
  setMotDePasse: (value: string) => void;
};
