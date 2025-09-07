import supabase from "./supabase";

export async function signup({ fullName, email, password, avatar }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: avatar ?? "",
      },
    },
  });

  if (error) {
    console.error("Signup error details:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  // await supabase.auth.getSession() // get the data from local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data); // return data contains user if he currently login

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getUsers() {}

/* export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName(we can not update pass and fullName at the same time)

  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user (if successful then we actually need to update the user again)
  // By adding the URL to the avatar image as we did with cabins

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
} */
