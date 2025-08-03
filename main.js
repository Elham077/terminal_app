const yargs = require("yargs");
const { addContacts, listcontacts, removeContact } = require("./contacts");
const { default: chalk } = require("chalk");

yargs.scriptName(`${chalk.yellow("Elham's Terminal Project")}`);
yargs.usage(`$0 ${chalk.red("command")} ${chalk.green("[args]")}`);
yargs.command({
  command: "create",
  aliases: ["c", "new"],
  describe: `${chalk.green("Create a new contact")}`,
  builder: {
    fullname: {
      alias: "f",
      describe: `${chalk.green("Name of the contact")}`,
      demandOption: true,
      type: "string",
    },
    phone: {
      alias: "p",
      describe: `${chalk.green("Phone Number of the contact")}`,
      demandOption: true,
      type: "string",
    },
    email: {
      alias: "e",
      describe: "email of the contact",
      demandOption: true,
      type: "string",
    },
  },
  handler({ fullname, phone, email }) {
    addContacts(fullname, phone, email);
  },
});
yargs.command({
  command: "list",
  aliases: ["l"],
  describe: `${chalk.green("nothing just a test")}`,
  handler() {
    listcontacts();
  },
});
yargs.command({
  command: "remove",
  aliases: ["r"],
  describe: `${chalk.red("Remove a person!")}`,
  builder: {
    fullname: {
      alias: "fn",
      describe: "delete a contact",
      demandOption: true,
      type: "string",
    },
  },
  handler({ fullname }) {
    removeContact(fullname);
  },
});
yargs.parse();
