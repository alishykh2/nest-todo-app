import * as bcrypt from 'bcrypt';

export const genSalt = async () => await bcrypt.genSalt();

export const encrytPassword = async (password: string) => {
  const saltOrRounds = await genSalt();
  return bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, password2: string) => {
  return bcrypt.compare(password, password2);
};
