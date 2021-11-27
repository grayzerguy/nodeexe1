const express = require("express"); //import express
const app = express(); //create express app
const fs = require("fs"); //file system
const path = require("path"); //to get the path of the file
app.use(express.json()); //to parse json

// 1. Create nodejs 'express' server
// 2. The server will listen to port 3000
// 3. Add 'get' API, When I will open a browser (Chrome) and set the following url: http://localhost:3000 I will get text response: 'This text returned from my nodejs server'

//excercise 15
app.get("/message", (req, res) => {
  res.send("This text returned from my nodejs server");
});

// get whit query string
//ecxercise 16
//1. Create nodejs 'express' server
// 2. The server will listen to port 3000
// 3. Add 'get' API, When I will open a browser (Chrome) and set the following url with the query params:
//    'http://localhost:3000?num1=23&num2=12' I will get text response: num1+num2

// -   You can read the query params from the 'req.query'
// number  כדי לעבוד על אותו שרת הוספתי

app.get("/:number", (req, res) => {
  const query = req.query;
  res.json(query);
});

//excercise 17
// 1. Create nodejs 'express' server
// 2. The server will listen to port 3000
// 3. Add 'get' API, When I will open a browser (Chrome) and set the following url with the url param:
//    'http://localhost:3000/1978' I will get text response: 'You whare born in 1978'

// -   You can read the path params from the 'req.params'

app.get("/:year", (req, res) => {
  const year = req.params.year;
  res.send(`You whare born in ${year}`);
});

//excercise 18
//load html file
// 1. Create nodejs 'express' server
// 2. The server will listen to port 3000
// 3. Add 'get' root API (http://localhost:3000), When I will get to this url I'll get an HTML file as follow:

//     - The HTML file will include the following:
//         1. 3 inputs for: firstName, lastName, id
//         2. 1 button
//         3. When I will press on the button I expect the firstName, lastName, id will be send by 'post' method as an json object to
//            the server to the following url: http://localhost:3000/persons
//         - To do 'post' to the server use the 'fetch' function

// 4. Add 'post' '/persons' API (http://localhost:3000/persons),
// When I will post to this url, the income object will be pushed to an array (this array will be define ion the server: const personsArray = [])
// 5. Add 'get' '/persons/:id' API (http://localhost:3000/persons/<id>),
// When I will get to this url, I will get json response with the person that have this supplied id,
//you supposed to find is inside the personsArray, in case it doesn't exist return empty object {}
// or object with message {message: 'This person doesn't exist' }

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let personsArray = [];

app.post("/persons", (req, res) => {
  const { firstName, lastName, id } = req.body;
  personsArray.push(req.body);
  console.log(personsArray);
  res.send(personsArray);
});

app.get("/persons/:id", (req, res) => {
  const person = personsArray.find((person) => person.id === req.params.id);
  if (!person) {
    res.json({ message: "This person does not exist" });
  }

  res.json({ message: `this is your name: ${person.fName} ${person.lName}` });
});

//listen to port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
