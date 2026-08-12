import type { EmploymentRole } from "@/types/portfolio.types";

/**
 * Orders roles with the current role first, then by start year descending.
 * @param roles Employment roles to sort.
 */
export function sortEmploymentRoles(
  roles: readonly EmploymentRole[],
): EmploymentRole[] {
  return [...roles].sort((left, right) => {
    const leftCurrent = left.endYear === null ? 1 : 0;
    const rightCurrent = right.endYear === null ? 1 : 0;

    if (leftCurrent !== rightCurrent) {
      return rightCurrent - leftCurrent;
    }

    return right.startYear - left.startYear;
  });
}
