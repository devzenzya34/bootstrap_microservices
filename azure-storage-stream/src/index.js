import express from 'express';
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    console.error("Erreur lors du chargement du fichier .env :", result.error);
    process.exit(1);
}

// console.log("Variables d'environnement chargées :", {
//     PORT: process.env.PORT,
//     TEST: process.env.TEST,
//     NAME: process.env.NAME,
//     // Ne pas logger STORAGE_ACCOUNT_KEY pour des raisons de sécurité
// });

const PORT = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.NAME;
const STORAGE_ACCOUNT_KEY = process.env.KEY;


// Function that connects to Azure Blob Storage
function createBlobService() {
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
    const blobService = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential); //https://videostorage34.blob.core.windows.net/videos/sample_video2.mp4
    return blobService;
}

//init express server
const app = express();

// Index route
app.get('/videos', async (req, res) => {
    const videoPath = req.query.path;
    //console.log(`videoPath: ${videoPath}`);
    
    const containerName = "videos";
    const blobService = createBlobService();

    const containerClient = blobService.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(videoPath);

    const properties = await blobClient.getProperties();
    res.writeHead(200, {
        "Content-Length": properties.contentLength,
        "Content-Type": "video/mp4",
    });
    const response = await blobClient.download();
    response.readableStreamBody.pipe(res);
})

app.listen(PORT);