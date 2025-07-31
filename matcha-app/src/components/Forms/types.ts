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

export type LoginFormProps = {
  email: string;
  motDePasse: string;
  setEmail: (text: string) => void;
  setMotDePasse: (text: string) => void;
  errors: {
    email?: string;
    motDePasse?: string;
  };
};
