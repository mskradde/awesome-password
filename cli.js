const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterpassword,
} = require("./lib/passwords");

async function main() {
  const { masterPassword, action } = await askStartQuestions();
  const originalMasterPassword = await readMasterpassword();

  if (masterPassword !== originalMasterPassword) {
    const {newMasterPas}
    console.log("Master Password is incorrect!");
    return;
  }
  console.log("Master Password is correct!");
  if (action === CHOICE_GET) {
    console.log("Now Get a password");
         const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key, masterPassword);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
        // What to do now?
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password, masterPassword);
      console.log(`New Password set`);
    }

}

main();
