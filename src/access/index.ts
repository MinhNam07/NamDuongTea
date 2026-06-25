import type { Access, FieldAccess } from "payload";

import { canPublish, hasRole, ROLES } from "@/access/roles";

export { canPublish, getUserRole, hasRole, ROLES } from "@/access/roles";
export type { UserRole } from "@/access/roles";

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const isAdmin: Access = ({ req: { user } }) =>
  hasRole(user, ROLES.ADMIN);

export const isManagerOrAbove: Access = ({ req: { user } }) =>
  hasRole(user, ROLES.ADMIN, ROLES.MANAGER);

export const isStaff: Access = ({ req: { user } }) =>
  Boolean(user) &&
  hasRole(user, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR);

/** Staff read all; public only sees published content. */
export const staffOrPublishedOnly: Access = ({ req: { user } }) => {
  if (isStaff({ req: { user } } as Parameters<typeof isStaff>[0])) return true;
  return {
    and: [
      { _status: { equals: "published" } },
      { status: { equals: "published" } },
    ],
  } as const;
};

/** Staff read all drafts; public only sees published versions. */
export const staffOrPublishedDraftOnly: Access = ({ req: { user } }) => {
  if (isStaff({ req: { user } } as Parameters<typeof isStaff>[0])) return true;
  return { _status: { equals: "published" } };
};

/** Public reads only published documents (Payload drafts + legacy status field). */
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true;
  return {
    and: [
      { _status: { equals: "published" } },
      { status: { equals: "published" } },
    ],
  } as const;
};

/** Published-only for collections without custom status field. */
export const publishedDraftOnly: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};

export const staffCanMutate: Access = ({ req: { user } }) =>
  Boolean(user) && isStaff({ req: { user } } as Parameters<typeof isStaff>[0]);

export const adminOnly: Access = ({ req: { user } }) =>
  Boolean(user) && isAdmin({ req: { user } } as Parameters<typeof isAdmin>[0]);

export const adminOrSelf: Access = ({ req: { user }, id: userId }) => {
  if (!user) return false;
  if (hasRole(user, ROLES.ADMIN)) return true;
  return { id: { equals: userId } };
};

/** Editors cannot set status to published. */
export const canSetPublishedStatus: FieldAccess = ({ req: { user } }) =>
  canPublish(user);
