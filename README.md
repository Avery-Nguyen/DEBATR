# DEBATR

## Project Overview

DebatR is a Web application that allows the users to have civilized debates on popular topics or topic of their choice through video chat. Our app controls the flow of the debate so the "DebatRs" can worry less about uncontrolled rants and focus more on discussions. There is also a debate review and user ranking system to allow users to view the results of pervious debates and increase their rating on the leaderboard. 

*Special thanks to [Phil Nash](https://github.com/philnash) and his [Twilio Video chat with React Hooks](https://github.com/philnash/twilio-video-react-hooks) tutorial to help make this application possible.*

## Contributors

- [Avery Nguyen](https://github.com/Avery-Nguyen)

- [Andrew Delmar](https://github.com/andrewdelmar87)

- [Trevor Thomas](https://github.com/BDeWitt-Cohen)

- [Alex Hladun](https://github.com/alex-hladun)

## Screenshots

- Lobby
- Stage
- Stats
- User Card

## Languages and Tools
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
<img align="left" alt="Sass" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sass/sass.png" />
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="Git" width="26px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" />
<br/>

## Dependencies
- Axios
- Bcrypt
- Cookie-session
- Fibers
- Postgres
- Sass
  - Node-sass
- React
  - React-dom
  - React-router-dom
  - React-scripts
  - React-scrollable-feed
  - React-simple-pie-chart
  - React-svg-piechart
- Recharts
- Socket.io
  - Socket.io-client
- Twilio-video
- Material-ui
- Bit
- Typescript
- Utf-8-validate

## Preparing the application

To run the application you will need a [Twilio account](https://www.twilio.com/try-twilio) and Node.js and npm installed. Start by forking and cloning this repo to your machine.


Install the dependencies:

```bash
npm install
```

Create a `.env` file by copying the `.env.example`.

```bash
cp .env.example .env
```

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

## Running the application

Once you have completed the above you can run the application with:

```bash
npm run dev
```

This will open in your browser at [localhost:3000](http://localhost:3000).
