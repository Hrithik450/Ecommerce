import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const bashScript = (req, res, next) => {
  const filePath = path.join(__dirname, "../config/mern.sh.enc");

  res.download(filePath, "mern.sh.enc", (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(500).send("Error downloading script");
    }
  });
};
