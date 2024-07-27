import {
  Client,
  ID,
  Account,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.app.aora",
  projectId: "66a3e81d0020d1a28bb8",
  databaseId: "66a3e916000e44a6df27",
  userCollectionId: "66a3e94d003dc6dbe03a",
  videoCollectionId: "66a3e98700287bc8df38",
  storageId: "66a3ebcc002bf4f581c0",
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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("Not logged in");

    const currentUser = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("No current user!");
    return currentUser.documents[0];
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw error;
  }
};