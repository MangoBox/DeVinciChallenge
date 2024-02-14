const express = require('express');
const cors = require("cors");

const { MongoClient } = require('mongodb');

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch('client/src');

const app = express();

var teams = Array.from({ length: 10 }, () => Array(10).fill(0));

var teamQuizzes = [
  "https://quiz1.com",
  "https://quiz2.com",
  "https://quiz3.com",
  "https://quiz4.com",
  "https://quiz5.com",
  "https://quiz6.com",
  "https://quiz7.com",
  "https://quiz8.com",
  "https://quiz9.com",
  "https://quiz10.com"
];
//teams[0][0] = 1707822079000;  

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

app.use(connectLiveReload());

// serve up production assets
app.use(express.static('client/build'));
app.use(cors());
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');

app.get("/api", (req, res) => {
    //res.json(teams);
    res.json(teams);
});

app.get("/find", (req, res) => {
  //res.json(teams);
  console.log("req finder: " +req.query['finder']  );
  if(req.query['finder'] != null && req.query['found'] != null) {
    
    //var txt = "Team " + findingTeam + " has found Team " + foundTeam;
    //console.log(txt);
    finder = parseInt(req.query['finder']);
    found = parseInt(req.query['found']);
    //Special case for Team 10
    if(finder == 0) {
      finder = 10;
    }
    if(found == 0) {
      found = 10;
    }
    teams[finder-1][found-1] = Date.now();
    console.log(teams);
  }
  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'Found.html'))
  res.redirect(teamQuizzes[found-1]);
  res.end();

  
});

app.get('*', (req, res) => {
    console.log("Found");
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


// if not in production use the port 5000
//const PORT = process.env.PORT || 5000;
const PORT = 80;
console.log('server started on port:',PORT);
app.listen(PORT);