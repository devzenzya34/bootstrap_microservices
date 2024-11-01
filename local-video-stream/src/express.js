import express from "express";
import dotenv from "dotenv";
import http from "http";
import mongodb from "mongodb";

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error("Erreur lors du chargement du fichier .env :", result.error);
  process.exit(1);
}

// console.log("Variables d'environnement chargées :", {
//     PORT: process.env.PORT,
//     STORAGE_ACCOUNT_NAME: process.env.STORAGE_ACCOUNT_NAME,
//     // Ne pas logger STORAGE_ACCOUNT_KEY pour des raisons de sécurité
// });

// Configure connection to the video-storage microservice
const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = process.env.VIDEO_STORAGE_PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

async function main() {
  // Connect to MongoDB
  const client = new mongodb.MongoClient(DBHOST);
  await client.connect(DBNAME);
  const db = client.db(DBNAME);
  const videosCollection = db.collection("videos");
  console.log("Connected to MongoDB");

  // Use expres
  const app = express();

  // Use Http built in library to forward requests from microservice
  app.get("/videos", async (req, res) => {
    const videoId = new mongodb.ObjectId(req.query.id);
    const videoRecord = await videosCollection.findOne({ _id: videoId });
    if (!videoRecord) {
      return res.status(404).send("Video not found");
    }

    console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);

    const forwardedRequest = http.request(
      {
        // set host, port and path
        host: VIDEO_STORAGE_HOST,
        port: VIDEO_STORAGE_PORT,
        path: `/videos?path=${videoRecord.videoPath}`,
        method: "GET",
        headers: req.headers,
      },
      //gets the response from forwarded request
      (forwardResponse) => {
        res.writeHead(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
      }
    );
    req.pipe(forwardedRequest);
  });

  // Http stream route
  /*app.get('/videos', async (req, res) => {
    const videoPath = './videos/sample_video.mp4';
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath).pipe(res);
})*/

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Microservice fail to start");
  console.error((err && err.stack) || err);
});
