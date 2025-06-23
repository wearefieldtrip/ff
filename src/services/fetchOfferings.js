/**
 * Filters offerings by school name and outcome title.
 * @param {Array} offerings - All offerings.
 * @param {string} schoolName - The school to filter by.
 * @param {string} outcomeName - The outcome to filter by.
 * @returns {Array} - Filtered offerings.
 */
export function filterOfferingsBySchoolAndOutcome(
  offerings,
  schoolName,
  outcomeName
) {
  console.log("ran");
  return offerings.filter(
    (offering) =>
      offering.associated_schools?.includes(schoolName) &&
      offering.associated_outcomes?.includes(outcomeName) &&
      (!offering.associated_interests ||
        offering.associated_interests.length === 0)
  );
}
/**
 * Filters offerings by school, outcome, and interest.
 * @param {Array} offerings - All offerings.
 * @param {string} schoolName - The school to filter by.
 * @param {string} outcomeName - The outcome to filter by.
 * @param {string} interest - The interest to filter by.
 * @returns {Array} - Filtered offerings.
 */
export function filterOfferingsBySchoolOutcomeInterest(
  offerings,
  schoolName,
  outcomeName,
  interest
) {
  return offerings.filter(
    (offering) =>
      offering.associated_schools?.includes(schoolName) &&
      offering.associated_outcomes?.includes(outcomeName) &&
      offering.associated_interests?.includes(interest)
  );
}
