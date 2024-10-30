import express from 'express';
import fs from 'fs';


const app = express();
const port = 3000;

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