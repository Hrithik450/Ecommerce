import { exec } from "child_process";

export const callWebhook = async (req, res) => {
  const branch = req.body.ref;

  if (branch === "refs/heads/main") {
    console.log("GitHub Webhook Received for 'main' branch");

    exec("bash /var/Anox/Anuv/deploy.sh", (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec error: ${error.message}`);
        return res.status(500).send("Deployment failed");
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.status(200).send("Deployment successful!");
    });
  } else {
    console.log(`Ignored push to ${branch}`);
    res.status(200).send("Push ignored, not on 'main' branch.");
  }
};
