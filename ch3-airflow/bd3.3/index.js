const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.update watched status of video by id
let watchList = [
  { videoId: 1, title: "JavaScript Tutorial", watched: false, url: "https://youtu.be/shorturl1" },
  { videoId: 2, title: "Node.js Basics", watched: true, url: "https://youtu.be/shorturl2" },
  { videoId: 3, title: "React.js Guide", watched: false, url: "https://youtu.be/shorturl3" }
];

function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
      return watchList;
    }
  }
  return watchList;
}

app.get("/watchlist/update", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

//update status of all videos
function updateAllVideosWatchedStatus(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

app.get("/watchlist/update-all", (req, res) => {
  let watched = req.query.watched === "true";
  let result = updateAllVideosWatchedStatus(watchList, watched);
  res.json(result);
});

//3.delete video by id
function shouldDeleteById(video, videoId) {
  return video.videoId !== videoId;
}

app.get("/watchlist/delete", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  watchList = watchList.filter((video) => shouldDeleteById(video, videoId));
  res.json(watchList);
});

//4. delete watched video
function isWatched(video) {
  return video.watched;
}

app.get("/watchlist/delete-watched", (req, res) => {
  watchList = watchList.filter((video) => !isWatched(video));
  res.json(watchList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
