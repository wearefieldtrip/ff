import { supabase } from "./supabaseClient"; // adjust path as needed

export async function fetchOfferingsBySchoolAndOutcome(
  schoolName,
  outcomeName
) {
  const { data, error } = await supabase
    .from("offerings")
    .select("*")
    .contains("associated_schools", [schoolName])
    .contains("associated_outcomes", [outcomeName]);

  if (error) {
    console.error("Error fetching offerings:", error);
    return [];
  }

  return data;
}

export async function fetchOfferingsBySchoolOutcomeInterest(
  schoolName,
  outcomeName,
  interest
) {
  const { data, error } = await supabase
    .from("offerings")
    .select("*")
    .contains("associated_schools", [schoolName])
    .contains("associated_outcomes", [outcomeName])
    .contains("associated_interests", [interest]);

  if (error) {
    console.error("Error fetching offerings:", error);
    return [];
  }

  return data;
}
