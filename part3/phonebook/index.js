const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
// app.use(morgan("tiny"));
morgan.token("body", function (req, res) {
  return req.body;
});
const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    req.method === "POST" ? JSON.stringify(tokens.body(req, res)) : "",
  ].join(" ");
});
app.use(logger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = (max) => {
  return Math.floor(Math.random() * max + 100 * max);
};

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date = new Date();
  res.send(`<p>${info}</p><p>${date}</p>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (persons.filter((p) => p.name === body.name).length > 0) {
    return res.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(persons.length),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
