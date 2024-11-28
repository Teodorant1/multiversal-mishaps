import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Adjust salt rounds as needed (default is 10)

  // Generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
