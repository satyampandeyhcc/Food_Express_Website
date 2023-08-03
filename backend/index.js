const express = require("express");
const app = express();
const path = require("path");

const port = 5000;
app.use(cors(
  {
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
))
// In nodejs we are use the keywords require rather than import.
const mongoDB = require("./db");
// mongoDB();

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
mongoose.connect("mongodb://foodExpress:Satyam123@ac-z6u5csa-shard-00-00.cmvvd4f.mongodb.net:27017,ac-z6u5csa-shard-00-01.cmvvd4f.mongodb.net:27017,ac-z6u5csa-shard-00-02.cmvvd4f.mongodb.net:27017/foodExpress?ssl=true&replicaSet=atlas-lsvrwm-shard-0&authSource=admin&retryWrites=true&w=majority")
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
