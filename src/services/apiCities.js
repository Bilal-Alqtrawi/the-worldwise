import supabase from "./supabase";

export async function getCities(userId) {
  const { data: Cities, error } = await supabase
    .from("Cities")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Cities could not be loaded");
  }

  console.log(Cities);

  return Cities;
}

export async function getCity(id, userId) {
  const { data, error } = await supabase
    .from("Cities")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error in fetching City");
  }

  return data;
}

export async function addCity(newCity, userId) {
  const { data, error } = await supabase
    .from("Cities")
    .insert([{ ...newCity, user_id: userId }])
    .single();
  if (error) {
    console.error(error);
    throw new Error("Error in Adding new City");
  }

  return data;
}

export async function deleteCity(id, userId) {
  const { error } = await supabase
    .from("Cities")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Error in Adding new City");
  }
}
