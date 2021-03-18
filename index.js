import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api", (req, res) => {
  const { nameData, textData, emailData } = req.body;
  res.json({
    name: nameData,
    text: textData,
    email: emailData,
  });
  console.log(req.body);
});

app.listen(port, () => console.log(`server is connected on ${port}`));
