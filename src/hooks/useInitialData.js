import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabaseClient";

const fetchInitialData = async () => {
  const [schools, outcomes, offerings, interests] = await Promise.all([
    supabase.from("schools").select("*"),
    supabase.from("outcomes").select("*"),
    supabase.from("offerings").select("*"),
    supabase.from("interests").select("*"),
  ]);

  const errors = [schools, outcomes, offerings, interests].filter(
    (r) => r.error
  );
  if (errors.length > 0) throw new Error("Error loading data");

  return {
    schools: schools.data,
    outcomes: outcomes.data,
    offerings: offerings.data,
    interests: interests.data,
  };
};

export const useInitialData = () =>
  useQuery({
    queryKey: ["initialData"],
    queryFn: fetchInitialData,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
