const express = require('express');
const cors = require("cors");

const { MongoClient } = require('mongodb');

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");


const liveReloadServer = livereload.createServer();
liveReloadServer.watch('client/src');



const app = express();

var teams = Array.from({ length: 10 }, () => Array(10).fill(0));
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
    teams[finder][found] = Date.now();
    console.log(teams);
  }
  res.sendStatus(200);

  
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