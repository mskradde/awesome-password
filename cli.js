const inquirer = require("inquirer");
const fs = require("fs");
const { async } = require("rxjs");

// fs.readFile("./passwords.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(data);
// });

async function getPasswords() {
    const passwords = await.fs.readFile("./passwords.json", "utf-8");
    console.log(passwords)
}
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
inquirer.prompt(questions).then((answers) => {
  console.log(`Your password is ${answers.password}!`);
  if (answers.password === "123") {
  } else {
    console.log("Password is incorrect!");
  }

  console.log(`You like to know the password of ${answers.key}!`);
});
