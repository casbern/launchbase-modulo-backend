const express = require('express')
const nunjucks = require('nunjucks')
 
const server = express()
const videos = require("./data")

server.use(express.static('public'))

// let's config nunjucks
server.set('view engine', 'njk')
nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

// let's config server
server.get('/', function(req, res) {
  const about = {
    avatar_url: "https://media.licdn.com/dms/image/C4D03AQFDa4Xk_VjWIw/profile-displayphoto-shrink_200_200/0?e=1579132800&v=beta&t=LNYsTS5pIJcmZ4dCDbz-tbtzcjYAEGcnv6mTfGSS-l8",
    name: "Cassia Bernardo",
    role: "Web Developer",
    description: "Passionate about building beautiful websites",
    links: [
      { name: "Github", url: "https://github.com/cah90" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/cassia-bernardo/"}
    ]

  }
  return res.render('about', { about: about })
})

server.get('/portfolio', function(req, res) {
  return res.render('portfolio', { items: videos })
})

server.get('/video', function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video) {
    return video.id == id
  })

  if(!video) {
    return res.send("Video was not found")
  }

  return res.render("video", { item: video })
})

server.listen(process.env.PORT || 5000, function(){
  console.log('server is running')
})