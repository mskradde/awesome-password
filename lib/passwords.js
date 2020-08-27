const fs = require("fs").promises;
const { encrypt } = require("./crypto");

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function writePasswords(passwords) {
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./passwords.json");
}

async function readPassword(key, masterPassword) {
  const passwords = await readPasswords();
  const password = passwords[key];
  return password;
}

async function writePassword(key, value, masterPassword) {
  const passwords = await readPasswords();
  passwords[key] = encrypt(value, masterPassword);
  await writePasswords(passwords);
}

async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}

async function writeMasterPassword(masterPassword) {
  await fs.writeFile("./masterPassword", masterPassword);
}
exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterpassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
