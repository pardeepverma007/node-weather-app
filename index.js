const express = require("express");
const forcast = require("./src/utills/forcast");
const geocode = require("./src/utills/geocode");
const path = require("path");
const hbs = require("hbs");

const app = express();

// SET PATH OF CONFIGRATION
const publicDirePath = path.join(__dirname, "./public");
const viewPath = path.join(__dirname, "./template");
const partilsPath = path.join(__dirname, "./template/partials");

// SET STATIC DIR TO SERVER
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partilsPath);

app.use(express.static(publicDirePath));

geocode("india", (error, data) => {
  if (error) {
    return console.log("ERROR:", error);
  } else {
    forcast(data.lattitude, data.logitude, (error, data) => {
      if (error) {
        return console.log(error);
      } else {
        console.log("DATA of forcast :", data);
      }
    });
  }

  // console.log("ERROR:", error);
  // console.log("DATA:", data);
});

app.get("/", (req, resp) => {
  resp.render("index", {
    title: "Weather",
    name: "Pardeep Verma",
  });
});

app.get("/about", (req, resp) => {
  resp.render("about", {
    title: "About Me",
    name: "Pardeep Kumar",
  });
});

app.get("/help", (req, resp) => {
  resp.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
  });
});

app.get("/weather", (req, resp) => {
  if (!req.query.address) {
    resp.send({
      Error: "you must have provide address!",
    });
  }
  geocode(
    req.query.address,
    (error, { lattitude, logitude, location } = {}) => {
      if (error) {
        return resp.send({ error });
      } else {
        forcast(lattitude, logitude, (error, forcastData) => {
          if (error) {
            return resp.send({ error });
          } else {
            resp.send([
              {
                forcast: forcastData,
                location,
                address: req.query.address,
              },
            ]);
          }
        });
      }

      // console.log("ERROR:", error);
      // console.log("DATA:", data);
    }
  );
  // resp.send([
  //   {
  //     forcast: "it is snowing",
  //     location: req.query.address,
  //   },
  // ]);
});

app.get("/product", (req, resp) => {
  if (!req.query.search) {
    return resp.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  resp.send({
    product: [],
  });
});

app.get("/help/*", (req, resp) => {
  resp.render("404", {
    errorMessage: 'Help article not found.'
  });
});

app.get("*", (req, resp) => {
  resp.render("404", {
    errorMessage: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
