import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"));
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
    try {
        const keyWord = req.body.textInput;
        console.log("User wants a joke about " + keyWord);
        const result = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${keyWord}`);
        res.render("index.ejs", {jokeSetup: result.data.setup, jokeDelivery: result.data.delivery});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});