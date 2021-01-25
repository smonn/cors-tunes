const got = require("got");
const { send } = require("micro");

const baseURL = "https://itunes.apple.com";

module.exports = async (req, res) => {
  if (req.url.startsWith("/search")) {
    try {
      const response = await got(`${baseURL}${req.url}`, {
        responseType: "json",
        timeout: 4000,
      });

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");

      send(res, 200, response.body);
    } catch (err) {
      send(res, 500, { error: err.message });
    }
  } else {
    send(
      res,
      200,
      `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>CORS Tunes</title>
  <style>
    body {
      font-family: sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
    main {
      margin: 0 auto;
      max-width: 60rem;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>CORS Tunes</h1>
    <p>This is a simple API wrapper to enable CORS search for the <a target="_blank" rel="noreferrer noopener" href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1">iTunes Search API</a>. It's running on a free hobby node on Heroku. As such, it's not meant for production use. If it's down, it's down. You can also run this on your own by cloning the <a href="https://github.com/smonn/cors-tunes" target="_blank" rel="noreferrer noopener">GitHub repository</a>.</p>
    <p>Example request:</p>
    <pre>
GET https://cors-tunes.herokuapp.com/search?term=rock&media=music
    </pre>
  </main>
</body>
</html>
`
    );
  }
};
