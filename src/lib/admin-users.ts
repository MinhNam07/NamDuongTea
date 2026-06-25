export type SeedAdminUser = {
  email: string;
  password: string;
  name: string;
};

const REQUIRED_ADMIN_COUNT = 3;

function readAdminUser(index: 1 | 2 | 3): SeedAdminUser | null {
  const email = process.env[`ADMIN_USER_${index}_EMAIL`]?.trim();
  const password = process.env[`ADMIN_USER_${index}_PASSWORD`];
  const name =
    process.env[`ADMIN_USER_${index}_NAME`]?.trim() || `Admin ${index}`;

  if (!email || !password) {
    return null;
  }

  return { email, password, name };
}

/** Exactly 3 admin accounts configured via ADMIN_USER_{1,2,3}_* env vars. */
export function getSeedAdminUsers(): SeedAdminUser[] {
  const users = ([1, 2, 3] as const)
    .map(readAdminUser)
    .filter((user): user is SeedAdminUser => user !== null);

  if (users.length !== REQUIRED_ADMIN_COUNT) {
    throw new Error(
      `Cần cấu hình đủ ${REQUIRED_ADMIN_COUNT} tài khoản admin trong .env ` +
        `(ADMIN_USER_1_EMAIL/PASSWORD, ADMIN_USER_2_..., ADMIN_USER_3_...). ` +
        `Hiện có ${users.length}/${REQUIRED_ADMIN_COUNT}.`,
    );
  }

  const emails = users.map((user) => user.email.toLowerCase());
  if (new Set(emails).size !== emails.length) {
    throw new Error("Email admin không được trùng nhau.");
  }

  return users;
}

export const FIXED_ADMIN_COUNT = REQUIRED_ADMIN_COUNT;
