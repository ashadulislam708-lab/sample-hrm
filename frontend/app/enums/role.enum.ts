export enum RoleEnum {
  EMPLOYEE = 'employee',
  TEAM_LEADER = 'team_leader',
  HR_ADMIN = 'hr_admin',
}

export const ROLE_HOME_ROUTE: Record<RoleEnum, string> = {
  [RoleEnum.EMPLOYEE]: '/employee/dashboard',
  [RoleEnum.TEAM_LEADER]: '/team/dashboard',
  [RoleEnum.HR_ADMIN]: '/admin/dashboard',
};
