import express from 'express';
//import dotenv from 'dotenv';
import fs from 'fs';

//dotenv.config();
// Throw error if .env file is not found
if (!process.env.PORT) {
    throw new Error('Please specify de PORT in the .env file that is not found');
}

// Get PORT
const port = process.env.PORT;

const app = express();


// Index route
app.get('/', (req, res) => {
    res.send('Videos Streaming App Server');
})

// Http stream route
app.get('/videos', async (req, res) => {
    const videoPath = './videos/sample_video.mp4';
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath).pipe(res);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})