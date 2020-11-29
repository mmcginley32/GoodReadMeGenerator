const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
const questions = [
    {
        type:'input',
        message: "What is your GitHub username?",
        name: "github"
    },{
        type:'input',
        message: "What is your email?",
        name: "email"
    },{
        type:'input',
        message: "What is the title of your project?",
        name: "title"
    },{
        type:'input',
        message: "Give a brief description of your what your project does:",
        name: "description"
    },{
        type:'input',
        message: "What does the user need to know about using the repo?",
        name: "usage"
    },{
        type:'input',
        message: "What command should be run to install the dependencies?",
        name: "install"
    },{
        type:'list',
        message: "What kind of license would you like to use for this project?",
        choices: ["MIT","GNU","ISC","Apache"],
        name: "license"
    },{
        type:'input',
        message: "How can someone test this project?",
        name: "testing"
    },{
        type:'input',
        message: "How can others contribute to the project?",
        name: "contribution"
    }
];



// function to write README file
function writeToFile(fileName, { title, description, usage, install, contribution, license, testing, github, email }) {
    const codeStyling = "```"
    const readme = `# ${title}
## License
![GitHub license](https://img.shields.io/badge/license-${license}-red.svg)
## Description
${description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
To install the necessary denpendencies, run the following command:
${codeStyling}
${install}
${codeStyling}
## Usage
${usage}
## Contributing
${contribution}
## Tests
${testing}
## Questions
If you have any questions you can email me at: ${email}
Also feel free to check out my GitHub page here: https://github.com/${github}
`

    // console.log('readme: ', readme);

    fs.writeFile(fileName, readme, err => {
        if (err) {
            throw err;
        }
        console.log(`Saved`);
    },)
    .catch (err => console.log(err));
}

// function to initialize program
async function init() {
    try {
        console.log("This will generate a README.md file.")
        console.log("To create a list in your answers use ';' to seperate list items and ':' after your list title if you want one.");
        console.log(`If you type 'run "<code line>"' it will be given code syntax in the readme file.`);
        const answers = await inquirer.prompt(questions);
        // console.log('answers: ', answers);
        
        writeToFile("README.md", answers)
    }
    catch {err => console.log(err)};
}

// function call to initialize program
init();
