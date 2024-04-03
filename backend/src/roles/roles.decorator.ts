import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/auth/dto/signup.dto"; // Import the UserRole enum

type Role = keyof typeof UserRole;

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
