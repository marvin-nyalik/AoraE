import { Client, ID, Account, Avatars, Databases } from "react-native-appwrite";

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "alleagy.marvin.aora",
  projectId: "66a3572b0029184aca4b",
  databaseId: "66a3595e000da791b635",
  userCollectionId: "66a359af00055d2991c7",
  videoCollectionId: "66a359f500342f50218d",
  storageId: "66a35d1600149cf92b88",
};

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client
  .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
  .setProject(Config.projectId) // Your project ID
  .setPlatform(Config.platform); // Your a pplication ID or bundle ID.

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error(`Account couldnt be created`);
    const avatarURL = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarURL }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function signIn(email, password) {
  try {
    const session = account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
