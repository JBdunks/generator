const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = [
  {
    type: "input",
    message: "What is your GitHub ID?",
    name: "github"
  },
  {
    type: "input",
    message: "What is the name of your project?",
    name: "project"
  },
  {
    type: "input",
    message: "How is this application installed?",
    name: "install"
  },
  {
    type: "input",
    message: "Provide a brief description of your project",
    name: "description"
  },
  {
    type: "input",
    message: "How will the user use your application?",
    name: "usage"
  },
  {
    type: "input",
    message: "Who will be contributing to this project?",
    name: "cont"
  },
  {
    type: "list",
    message: "What license will you be using?",
    name: "license",
    choices: ["APM", "CPAN", "Bower", "DUB", "n/a"]
  },
  {
    type: "list",
    message: "Which software will you be using to test your project?",
    name: "test",
    choices: ["Jest", "Selenium", "Ruby", "Jive", "other"]
  }
];

inquirer.prompt(questions).then(function(answers) {
  console.log(answers);
  axios
    .get(`https://api.github.com/users/${answers.github}/events/public`)
    .then(function(res) {
      //console.log(res.data);
      const avatar = res.data[0].actor.avatar_url;
      const email = res.data[0].payload.commits[0].author.email;
      console.log(email);
      console.log(avatar);

      var newFile = `
      
      Project Title
      ${answers.project}
      
      Project Description
      ${answers.description}
      
      Table of Contents
      
      Installation:
      ${answers.install}
      
      Usage:
      ${answers.usage}
      
      License:
      ${answers.license}
      
      Contributors:
      ${answers.cont}
      
      Testing Software:
      ${answers.test}
      
      GitHub user:${answers.github}
      ${avatar}
      Email Address: ${email}
      `;

      fs.writeFile("project.md", newFile, function(err) {
        if (err) {
          console.log("There was an error");
        } else {
          console.log("Index generated");
        }
      });
    });
});
