import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
