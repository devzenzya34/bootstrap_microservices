import express from 'express';
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import dotenv from 'dotenv';


dotenv.config();
const PORT = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCOUNT_KEY = process.env.STORAGE_ACCOUNT_KEY;

// Function that connects to Azure Blob Storage
function createBlobService() {
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
    const blobService = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
    return blobService;
}

//init express server
const app = express();

// Index route
app.get('/videos', async (req, res) => {
    const videoPath = req.query.path;
    console.log(`videoPath: ${videoPath}`);
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