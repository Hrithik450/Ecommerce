import path from "path";

export const bashScript = (req, res, next) => {
  const filePath = path.join(__dirname, "../config/mern.sh.enc");

  res.download(filePath, "mern.sh.enc", (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(500).send("Error downloading script");
    }
  });
};
