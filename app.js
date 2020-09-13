const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
  {
    type: 'list',
    name: 'emplyeeType',
    message: 'Whats is the employee Type?',
    choices: ['engineer', 'intern', 'nomore'],
  },
];

const manager = [
  {
    name: 'name',
    message: 'Whats is the manager name?',
    default: 'Moe1',
  },
  {
    name: 'id',
    message: 'Whats is the manager id?',
    default: '1111',
  },
  {
    name: 'email',
    message: 'Whats is the manager email?',
    default: 'moe1@yahoo.com',
  },
  {
    name: 'officeNumber',
    message: 'Whats is the manager office Number?',
    default: '123',
  },
];

const engineer = [
  {
    name: 'name',
    message: 'Whats is the engineer name?',
    default: 'Moe2',
  },
  {
    name: 'id',
    message: 'Whats is the engineer id?',
    default: '12342',
  },
  {
    name: 'email',
    message: 'Whats is the engineer email?',
    default: 'moe2@yahoo.com',
  },
  {
    name: 'github',
    message: 'Whats is the engineer github?',
    default: 'moe2@git.com',
  },
];

const intern = [
  {
    name: 'name',
    message: 'Whats is the Intern name?',
    default: 'Moe3',
  },
  {
    name: 'id',
    message: 'Whats is the Intern id?',
    default: '12343',
  },
  {
    name: 'email',
    message: 'Whats is the Intern email?',
    default: 'moe3@yahoo.com',
  },
  {
    name: 'school',
    message: 'Whats is the Intern school?',
    default: 'UCLA',
  },
];

const employee = [];

function loop() {
  inquirer
    .prompt(manager)
    .then(data => {
      console.log(data);
      employee.push(
        new Manager(data.name, data.id, data.email, data.officeNumber)
      );
      function q() {
        inquirer.prompt(questions).then(res => {
          const type = Object.values(res)[0];
          console.log(type);
          employeType(type);
        });
      }

      function employeType(type) {
        if ('nomore' !== type) {
          if ('intern' === type) {
            inquirer.prompt(intern).then(data2 => {
              employee.push(
                new Intern(data2.name, data2.id, data2.email, data2.school)
              );
              q();
            });
          } else if ('engineer' === type) {
            inquirer.prompt(engineer).then(data2 => {
              employee.push(
                new Engineer(data2.name, data2.id, data2.email, data2.github)
              );
              q();
            });
          }
        } else {
          console.log('Exitttt');
          console.log(employee);
          fs.writeFile(outputPath, render(employee), function (err) {
            if (err) throw err;
          });
          return;
        }
      }
      q();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}
loop();
