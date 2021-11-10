#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
} = require("./index");

//Customers Questions
const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Numbers",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email",
  },
];

program.version("1.0.0").description("Customer management CLI");

// program
// .command("add <firstname> <lastname> <phone> <email>")
// .alias("a")
// .description("Add a Customer")
// .action((firstname, lastname, phone, email) => {
// addCustomer({ firstname, lastname, phone, email });
// });

//Add Command
program
  .command("add")
  .alias("a")
  .description("Add a Customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

//Find Command
program
  .command("find <name>")
  .alias("f")
  .description("Find Customers")
  .action((name) => findCustomer(name));

//Update Commands
program
  .command("update <_id>")
  .alias("u")
  .description("Update a Customer")
  .action((_id) => {
    prompt(questions).then((answers) => updateCustomer(_id, answers));
  });

//Remove Command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove Customers")
  .action((_id) => removeCustomer(_id));

//List Command
program
  .command("list")
  .alias("l")
  .description("List all Customers")
  .action(() => listCustomers());

program.parse(process.argv);
