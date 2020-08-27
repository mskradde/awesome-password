const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
  askForNewMasterPassword,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://mskradde:8j6yNdVqwQxuZLs@development.jgwho.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const database = client.db("awesome-passwords");
    const collection = database.collection("passwords");

    const { masterPassword, action } = await askStartQuestions();
    const originalMasterPassword = await readMasterPassword();

    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      await writeMasterPassword(newMasterPassword);
      return;
    }
    if (masterPassword !== originalMasterPassword) {
      console.log("Master Password is incorrect!");
      return;
    }

    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key, masterPassword);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password, masterPassword);
      console.log(`New Password set`);
    } finally {
      await client.close();
    }
   
  }
}

main();
