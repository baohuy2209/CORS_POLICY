const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors");
  res.json({
    text: "You should not see this via a CORS request.",
  });
});
app.head("/simple-cors", (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});
app.get("/simple-cors", (req, res) => {
  console.info("GET /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [GET]",
  });
});
app.post("/simple-cors", (req, res) => {
  console.info("POST /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [POST]",
  });
});

app.options("/complex-cors", cors());
app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "Complex CORS requests are working. [DELETE]",
  });
});
const issue2options = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600,
};
app.options("/issue-2", cors(issue2options));
app.post("/issue-2", cors(issue2options), (req, res) => {
  console.info("POST /issue-2");
  res.json({
    text: "Issue #2 is fixed.",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
