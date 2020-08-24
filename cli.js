const inquirer = require("inquirer");
const { async } = require("rxjs");
const fs = require("fs").promises;

const questions = [
  {
    type: "password",
    name: "password",
    message: "What is your Master Password",
  },
  {
    type: "list",
    name: "action",
    message: "What do want to do?",
    choices: ["Get a password", "Set a password"],
  },
  {
    type: "input",
    name: "key",
    message: "Do you want to read or write",
  },
];
inquirer.prompt(questions).then(async (answers) => {
  console.log(`Your password is ${answers.password}!`);
  if (answers.password === "123") {
    console.log("Master Password is correct!");
    if (answers.action === "Get a password") {
      console.log("Get a password");
    } else if (answers.action)
      try {
        const passwordJSON = await fs.readFile("./passwords.json", "utf-8");
        const passwords = JSON.parse(passwordJSON);
        console.log(
          `Your ${answers.key} password is ${passwords[answers.key]}`
        );
      } catch (error) {
        console.error("Something went wrong.");
      }
  } else {
    console.log("Master Password is incorrect!");
  }
});
