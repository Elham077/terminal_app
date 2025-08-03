const { default: chalk } = require("chalk");
const fs = require("fs");

const addContacts = (fullname, phone, email) => {
  const contacts = loadContacts();
  const duplicate = contacts.find((c) => c.fullname === fullname);
  if (!duplicate) {
    contacts.push({ fullname, phone, email });
    savedContacts(contacts);
    console.log("====================================");
    console.log(chalk.green("Contact Saved!"));
    console.log("====================================");
  } else {
    console.log("====================================");
    console.log(chalk.yellowBright("Contact already exist!"));
    console.log("====================================");
  }
};
const removeContact = (fullname) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((c) => c.fullname !== fullname);
  if (contacts.length > filteredContacts.length) {
    savedContacts(filteredContacts);
    console.log(chalk.green(`${fullname} has been removed`));
  } else {
    console.log(chalk.red("contact not found!"));
  }
};
const loadContacts = () => {
  try {
    const dataBuffer = fs.readFileSync("contacts.json");
    const contacts = dataBuffer.toString();
    return JSON.parse(contacts);
  } catch (ex) {
    console.log("====================================");
    console.log(ex);
    console.log("====================================");
    return [];
  }
};
const listcontacts = () => {
  const contacts = loadContacts();
  if (contacts.length > 0) {
    console.log("your contacts: \n");
    // ================================ method 1 ================================
    console.table(contacts);
    // ================================ method 2 ================================
    // you can log with this method too
    // contacts.forEach((contacts) => {
    //   console.log(`\t fullname: ${contacts.fullname}`);
    //   console.log(`\t fullname: ${contacts.phone}`);
    //   console.log(`\t fullname: ${contacts.email}`);
    //   console.log(
    //     "\t ================================"
    //   );
    // });
  } else {
    console.log(chalk.redBright("you don't have any contact:)"));
  }
};
const savedContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", data, (err) => {
    if (err) throw err;
    return console.log(chalk.green("Contact Saved Successfully"));
  });
};
module.exports = {
  addContacts,
  listcontacts,
  removeContact,
};
