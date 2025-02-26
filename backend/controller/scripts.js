import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getZipFile = (req, res, next) => {
  const zipFilePath = path.join(__dirname, "../config/setup.zip");

  res.download(zipFilePath, "setup.zip", (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(500).send("Error downloading script");
    }
  });
};
