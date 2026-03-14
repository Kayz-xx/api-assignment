import app from "./index";

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});