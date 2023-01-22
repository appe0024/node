const fs = require('fs');
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const activities = require('./activities.json');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/autumn', (req, res) => {
  //console.log('reqの中身', req.body);
  fs.writeFile(__dirname + '/data.txt', req.body.activity, () => {
    res.send('投稿完了');
  });
});

app.post('/update', (req, res) => {
  activities[0].activity = req.body.updateActivity;
  res.send(activities);
});

app.post('/delete', (req, res) => {
  activities.splice(req.body.number, 1);
  res.send(activities);
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
