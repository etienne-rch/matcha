export type ForgotPasswordFormProps = {
  setSent: (sent: boolean) => void;
};

export type NewPasswordFormProps = {
  token: string;
  onSuccess: () => void;
};
