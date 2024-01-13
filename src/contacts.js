import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((data) => data.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((data) => data.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

export { listContacts, getContactById, addContact, removeContact };