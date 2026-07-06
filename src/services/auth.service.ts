import { users } from "@/data/users";

export interface User {
  id: number;
  name: string;
  email: string;
}

const mockUsers = [...users];

/**
 * Simulates a network delay.
 * @param ms Delay in milliseconds.
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Log in a user with email and password.
 * Simulates a network delay of 800ms.
 * 
 * @param email User's email address.
 * @param password User's password.
 * @returns The logged-in User object without the password field.
 * @throws Error if credentials are invalid or fields are missing.
 */
export async function login(email: string, password: string): Promise<User> {
  await delay(800);

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = mockUsers.find(
    (u) => u.email.trim().toLowerCase() === normalizedEmail
  );

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Register a new user with name, email, and password.
 * Simulates a network delay of 800ms.
 * 
 * @param name User's display name.
 * @param email User's email address.
 * @param password User's password.
 * @returns The registered User object without the password field.
 * @throws Error if user already exists or fields are missing/invalid.
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  await delay(800);

  if (!name || !name.trim()) {
    throw new Error("Name is required.");
  }
  if (!email || !email.trim()) {
    throw new Error("Email is required.");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userExists = mockUsers.some(
    (u) => u.email.trim().toLowerCase() === normalizedEmail
  );

  if (userExists) {
    throw new Error("A user with this email already exists.");
  }

  const newId = mockUsers.length > 0 ? Math.max(...mockUsers.map((u) => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name: name.trim(),
    email: email.trim(),
    password: password,
  };

  mockUsers.push(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}
