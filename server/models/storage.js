const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = low(adapter);

function init() {
  db.defaults({
    feedback: [],
    skills: [
      {
        id: "age",
        number: 12,
        text: "Возраст начала занятий на скрипке"
      },
      {
        id: "concerts",
        number: 76,
        text: "Концертов отыграл"
      },
      {
        id: "cities",
        number: 30,
        text: "Максимальное число городов в туре"
      },
      {
        id: "years",
        number: 20,
        text: "Лет на сцене в качестве скрипача"
      }
    ],
    products: [],
    users: [
      {
        login: "admin@admin.ru",
        hash:
          "3144822F8A1010FC45BD248B912F15289ACEACE2095264748BBCEE17133966DF96F2F59077AF9ED576FF2065DDC23706927F1D1C60DB7EEC84A80C0F5A712302",
        salt: "5cce3d338d0566a7b6b93eef2418ecb3"
      }
    ]
  }).write();
}

function addFeedback(name, email, message) {
  db.get("feedback")
    .push({ name, email, message })
    .write();
}

function getSkills() {
  return db.get("skills").value();
}

function saveSkills(items) {
  db.get("skills")
    .find({ id: "age" })
    .assign({ number: items[0] })
    .write();

  db.get("skills")
    .find({ id: "concerts" })
    .assign({ number: items[1] })
    .write();

  db.get("skills")
    .find({ id: "cities" })
    .assign({ number: items[2] })
    .write();

  db.get("skills")
    .find({ id: "years" })
    .assign({ number: items[3] })
    .write();
}

function getProducts() {
  return db.get("products").value();
}

function addProduct(name, price, img) {
  db.get("products")
    .push({
      src: img,
      name,
      price
    })
    .write();
}

function getUser(login) {
  return db
    .get("users")
    .find({ login })
    .value();
}

module.exports = {
  init,
  addFeedback,
  getSkills,
  saveSkills,
  getProducts,
  addProduct,
  getUser
};
