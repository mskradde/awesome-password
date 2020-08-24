const inquirer = require("inquirer");
const { async } = require("rxjs");
const fs = require("fs").promises;

// fs.readFile("./passwords.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(data);
// });

const questions = [
  {
    type: "password",
    name: "password",
    message: "What is your password",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need",
  },
];
inquirer.prompt(questions).then(async (answers) => {
  console.log(`Your password is ${answers.password}!`);
  if (answers.password === "123") {
    console.log("Master Password is correct!");
    try {
      const passwordJSON = await fs.readFile("./passwords.json", "utf-8");
      const passwords = JSON.parse(passwordJSON);
      console.log(`Your ${answers.key} password is ${passwords[answers.key]}`);
    } catch (error) {
      console.error("Something went wrong.");
    }
  } else {
    console.log("Master Password is incorrect!");
  }
});
