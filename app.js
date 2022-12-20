const express = require("express");
const app = express();

const axios = require("axios");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});

app.post("/api/data", (req, res) => {
  res.status(200).json({
    name: "Melton",
    age: 23,
    // nickname:"melttt"
  });
});

let baseUrl = "http://localhost:8080/api/data";

app.get("/api/testing", (req, res) => {
  axios
    .post(baseUrl)
    .then((result) => {
      let data = result.data;
      res.status(200).json({
        // name:data.name
        data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        let { status, statusText } = err.response;
        res.status(status).send(statusText);
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
});

app.get("/api/testing2", (req, res) => {
  axios
    .get("https://reqres.in/api/users?page=2")
    .then((result) => {
      //   console.log(result.data);
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/testingByPost", (req, res) => {
  axios.post(("https://reqres.in/api/users"),
    req.body)
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => {
        res.send(err);
      });
});

// axios.get("https://reqres.in/api/users").then(data=> console.log(data.data))
// app.get("/api/newTest", async (req, res)=>{
//     const config = {
//         method:"get",
//         url:baseUrl
//     }
//     let somedata = await axios(config)
//     console.log("melton");
//     // res.send(somedata)
// })

// app.post("/api/createTest", (req, res)=>{
//     axios.post(baseUrl, req.body)
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch((err)=>{
//         console.log(err.message);
//     })
// })
