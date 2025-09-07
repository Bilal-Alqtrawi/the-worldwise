import supabase from "./supabase";

export async function getCities() {
  const { data: Cities, error } = await supabase.from("Cities").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cities could not be loaded");
  }

  return Cities;
}

export async function getCity(id) {
  const { data, error } = await supabase
    .from("Cities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error in fetching City");
  }

  return data;
}

export async function addCity(newCity) {
  const { data, error } = await supabase
    .from("Cities")
    .insert([{ ...newCity }])
    .single();
  if (error) {
    console.error(error);
    throw new Error("Error in Adding new City");
  }

  return data;
}

export async function deleteCity(id) {
  const { error } = await supabase.from("Cities").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error in Adding new City");
  }
}
