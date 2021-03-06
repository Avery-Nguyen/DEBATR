# User Story
- user can join chat room by choosing a topic
- user can engage in site, while non-user can only view active debates.
- user can rate other user's debate skills.
- user can agree or disagree on a topic.
- user and non-user can view overall debate statistics (specific statistics - )

Other Features
- on Signup, promise not to test nudity filter
(stretch)
- user and non-user can view previous debates.

# Project Description
Project title?
- Debatr
Project description - What problem your app solves?
- A platform to debate topics, in a game format, with a rewards system for civilized debate
Target audience - Your app will be useful to whom?
- Anyone looking for civil discussions on relevent topics, in a non-formal manner
Team members?
- Alex Hladun, Avery Nguyen, Andrew Delmar, Trevor Thomas

# Project Stack
- React | PostgreSQL / ElephantSQL | Node | Express | Twilio | Material.ui | Socket.io


# Stretch
- have text chat room for audience memebers to talk in
- Can record and save video to main page
  - (Stretch - Use AWS S3 / Firebase to host own videos)
- Nudity filter (Can Twilio help with this?)
- Verified users
- Implement jobs to handle the startGame timeout chain
- Any user can make any topic
- Implement our own RTC server instead of twilio.
- Implement Secure websockets
- Github OAuth login (can grab github prof pic)
- ALlow user to upload image.

# Routes
- General Routes
  - /
    - Main react app


- Twilio API routes
  - /video/token GET
    - request send when connecting to room
  - /video/token POST
    - as above, but POST request. Not sure why they have both.

- Our database routes
  - /api/rooms GET
    - Retrieve historical room and agreement rating info.
  - /api/users/ POST
    - Create an account
  - /api/login/ GET
    - Retrieve account details for logging in.
  - /api/users/ratings POST
    - Post user ratings after game
  - /api/agreement_ratings POST
    - Save agreement_ratings to server

  **Will do with WebSockets!
  - /api/users/ratings GET
    - Get user ratings
  - /api/rooms/ POST
    - Post room records after results are in

# ERD
![ERD](https://cdn.discordapp.com/attachments/737774601022734440/739192893193060435/Screen_Shot_2020-08-01_at_12.46.20_PM.png)

# Wireframes
![Wireframe](https://github.com/alex-hladun/final-project/blob/master/planning/img/Screen_Shot_2020-07-30_at_3.51.30_PM.png?raw=true)

# App Features

### Chat Room
- Display a timer (2 min)
- Will automaticlly mute users after 1 min
- Has video display of users (2 users)
- Can have an audience to rate the debate

### Main Page
- Shows list of topics to users and non-users
- Shows any ongoing debates
- allows users to click on topic
  - users can click to agree or disagree with topic and start a chat room

### Topics
- create, edit, and delete by the admin

### Sign-up page
- Allow non-users to sign-up

### Login Page
- Allow users to log in

# Exernal links

Colour Palette Tool
- https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6002ee&secondary.color=ffffff

Icons 
- https://material.io/resources/icons/?style=baseline

