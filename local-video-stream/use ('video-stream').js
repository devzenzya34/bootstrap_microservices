use ('video-stream')

db.createCollection("videos")

db.videos.insertOne({
    videoPath: "sample_video.mp4",
    status: "active"
})