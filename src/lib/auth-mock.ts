/**
 * DEMO AUTH LAYER — swap these three functions for real auth later.
 *
 * 1. `signInWithGoogle()`  -> replace with your Google OAuth flow.
 *    Set GOOGLE_OAUTH_CLIENT_ID below and call your provider's redirect/popup.
 * 2. `signInWithPassword()` -> replace with your institution auth API call.
 * 3. `sendPasswordReset()`  -> replace with a real reset-email service call.
 *
 * Nothing else in the UI needs to change — every screen calls only these.
 */

export type UserRole = "student" | "faculty";

export const ROLES: { value: UserRole; label: string; hint: string }[] = [
  { value: "student", label: "Student", hint: "Use your university student email" },
  { value: "faculty", label: "Faculty", hint: "Use your staff email address" },
];

/** TODO: put the real client ID here (or read from import.meta.env.VITE_GOOGLE_CLIENT_ID). */
export const GOOGLE_OAUTH_CLIENT_ID = "";

export type AuthResult = { ok: true; role: UserRole; name: string } | { ok: false; error: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function signInWithGoogle(role: UserRole): Promise<AuthResult> {
  await wait(700);
  if (!GOOGLE_OAUTH_CLIENT_ID) {
    return {
      ok: true,
      role,
      name: role === "faculty" ? "Dr. Meera Iyer" : "Aarav Sharma",
    };
  }
  // Real implementation goes here.
  return { ok: false, error: "Google OAuth is not configured yet" };
}

export async function signInWithPassword(
  role: UserRole,
  email: string,
  _password: string,
): Promise<AuthResult> {
  await wait(600);
  if (!email.includes("@")) return { ok: false, error: "Enter a valid institution email" };
  return { ok: true, role, name: role === "faculty" ? "Dr. Meera Iyer" : "Aarav Sharma" };
}

export async function sendPasswordReset(email: string): Promise<{ ok: boolean }> {
  await wait(600);
  return { ok: email.includes("@") };
}
