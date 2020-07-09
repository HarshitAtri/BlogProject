// server.js
// load the things we need
var express = require('express'),
  path = require('path');
var app = express();
var ejs = require('ejs');
const bodyParser = require("body-parser"); //for encode the url
const _ = require("lodash");   //for removing - and lower cases in url param
const NewsAPI = require('newsapi');
const { get } = require('lodash');
var request = require('request');
const { parseJSON } = require('jquery');
const { title } = require('process');
const htm = require('html');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



// const newsapi = new NewsAPI('3be888ce9f4c48d4a7852c71620a58eb');
// let url ="http://newsapi.org/v2/top-headlines?country=in&apiKey=3be888ce9f4c48d4a7852c71620a58eb";



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

// set the view engine to ejs + to join diffrent directories to render through them

app.set('views', [path.join(__dirname, 'views'),
path.join(__dirname, 'views/pages/'),
path.join(__dirname, 'views/partials/')]);
app.set('view engine', 'ejs', 'html');



app.use(bodyParser.urlencoded({ extended: true }));
// set images static for all website
// app.use(express.static("public"));
app.use('/', express.static(__dirname + '/public'));

let posts = [];
var imageurls = [];
var titles = [];
var descriptions = [];
var urls = [];



// index page 
app.get('/', function (req, res) {




  res.render("index", {
    imageurl0: imageurls[0][0],
    imageurl1: imageurls[0][1],
    imageurl2: imageurls[0][2],
    imageurl3: imageurls[1][0],
    imageurl4: imageurls[1][1],
    imageurl5: imageurls[1][2],
    imageurl6: imageurls[2][0],
    imageurl7: imageurls[2][1],
    imageurl8: imageurls[2][2],
    title0: titles[0][0],
    title1: titles[0][1],
    title2: titles[0][2],
    title3: titles[1][0],
    title4: titles[1][1],
    title5: titles[1][2],
    title6: titles[2][0],
    title7: titles[2][1],
    title8: titles[2][2],
    description0: descriptions[0][0],
    description1: descriptions[0][1],
    description2: descriptions[0][2],
    description3: descriptions[1][0],
    description4: descriptions[1][1],
    description5: descriptions[1][2],
    description6: descriptions[2][0],
    description7: descriptions[2][1],
    description8: descriptions[2][2],
    url0: urls[0][0],
    url1: urls[0][1],
    url2: urls[0][2],
    url3: urls[1][0],
    url4: urls[1][1],
    url5: urls[1][2],
    url6: urls[2][0],
    url7: urls[2][1],
    url8: urls[2][2]


  });
});
// about page 
app.get('/blogs', function (req, res) {
  res.render("blogs");
});

// home page // use res.render to load up an ejs view file
app.get('/home', function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});


app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/home");

});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

console.log("start")
let source = "bbc-news"
// let apiKey="3be888ce9f4c48d4a7852c71620a58eb"
const xhr = new XMLHttpRequest();
category = ["sports", "science", "health"]

for (j = 0; j < 3; j++) {
  console.log("j ki value "+j);
  var u = []
  var ui = []
  var d = []
  var t = []
  


  xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=${category[j]}&apiKey=3be888ce9f4c48d4a7852c71620a58eb`, false); //false paramenter is for syncronous if we use "true" code will run asyncronous way it might will occur error of sequence execution of program
  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      for (i = 0; i < 3; i++) {
        console.log(j +""+ i);
        description = articles[i].description;
        url = articles[i].url;
        title1 = articles[i].title;
        imageurl = articles[i].urlToImage;
        ui.push(imageurl);
        u.push(url);
        d.push(description);
        t.push(title1);
       
      }
      
      imageurls.push(ui);
      urls.push(u);
      descriptions.push(d);
      titles.push(t);
    }

  }

  console.log("chal gaya")
  xhr.send()
}


app.listen(3000, function () {
  console.log("Hello it's just for testing");
});



