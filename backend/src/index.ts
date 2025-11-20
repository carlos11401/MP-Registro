import app from "./app";

app.get("/", (req, res) => {
  res.json({ message: "MP - REGISTROS" });
});

app.listen(3000, () => {
  console.log(`API running on port 3000`);
});
