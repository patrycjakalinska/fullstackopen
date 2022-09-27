const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as na argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log("Please enter either number and name!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.ubmr4ym.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("phonebook");
    Person.find({}).then((res) => {
      res.forEach((person) => console.log(`${person.name} ${person.number}`));
      mongoose.connection.close();
    });
  });
} else {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log("Number added to the phonebook!");
      mongoose.connection.close();
    });
}
