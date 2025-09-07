import { useState } from "react";
import supabase from "../services/supabase";
import { cities } from "./data-cities";
import Button from "../components/Button";

// Delete all cities
async function deleteCities() {
  const { error } = await supabase.from("Cities").delete().gt("id", 0);

  if (error) console.error(error.message);
}

// Add all cities
async function createCities() {
  const { error } = await supabase.from("Cities").insert(cities);

  if (error) console.error(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    await deleteCities();

    await createCities();

    setIsLoading(false);
  }

  return (
    <Button type="primary" onClick={uploadAll} disabled={isLoading}>
      Upload ALL
    </Button>
  );
}

export default Uploader;
