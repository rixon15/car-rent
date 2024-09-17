import express from "express";

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'healthy'
    })
})

app.listen(4004, () => {
  console.log("Server is running on port 4004 in development enviroment");
});
