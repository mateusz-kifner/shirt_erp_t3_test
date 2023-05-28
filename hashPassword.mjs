import bcrypt from "bcrypt";

// @ts-ignore
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds to use

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    // Handle the error appropriately
    throw new Error("Failed to hash password");
  }
}

async function getHash() {
  const hash = await hashPassword("testuser");
  console.log(hash);
}
getHash();
