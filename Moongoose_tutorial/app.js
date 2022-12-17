const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/test");

mongoose.connection
  .once("open", () => {
    console.log("Connected");
  })
  .on("error", (error) => {
    console.log("error: ", error);
  });

// adding to DB
const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "why no name :/"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitsSchema,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);
const Person = mongoose.model("Person", personSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 4,
  review: "nice apple",
});

const kiwi = new Fruit({
  name: "kiwi",
  rating: 7,
  review: "nice apple",
});

const banana = new Fruit({
  name: "banana",
  rating: 7,
  review: "nice apple",
});

const orange = new Fruit({
  name: "orange",
  rating: 7,
  review: "nice apple",
});

const pineapple = new Fruit({
  name: "pineapple",
  rating: 7,
  review: "nice apple",
});

const person = new Person({
  name: "Bill",
  age: 69,
  favouriteFruit: pineapple,
});

// Fruit.insertMany([apple, kiwi, banana, orange], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success");
//   }
// });

// apple.save();
pineapple.save();
person.save();

// reading from database
Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
});
