export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  EDITOR: "editor",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export function getUserRole(user: unknown): UserRole | null {
  if (!user || typeof user !== "object" || !("role" in user)) return null;
  const role = (user as { role?: string }).role;
  if (role === ROLES.ADMIN || role === ROLES.MANAGER || role === ROLES.EDITOR) {
    return role;
  }
  return null;
}

export function hasRole(user: unknown, ...roles: UserRole[]): boolean {
  const role = getUserRole(user);
  return role !== null && roles.includes(role);
}

export function canPublish(user: unknown): boolean {
  return hasRole(user, ROLES.ADMIN, ROLES.MANAGER);
}
