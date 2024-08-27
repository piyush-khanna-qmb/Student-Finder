const prompt = require('prompt-sync')();
require('dotenv').config();
const ejs = require("ejs")
const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const app= express()
const port =  process.env.PORT|| 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
// app.use(express.static(__dirname + '/views/public'));
app.use(express.static(__dirname + '/'));

mongoose
.connect("mongodb+srv://piyush:piyushStudent@kawachtest.kglue.mongodb.net/deviceDB?retryWrites=true&w=majority&appName=KawachTest")
.then(async () => {
    console.log("Database Connected");
    // main()
});

const dataSchema = new mongoose.Schema({
    latitude: { type: Number },
    longitude: { type: Number },
    altitude: { type: Number },
    timestamp: { type: String },
    battery: { type: Number },
    speed: { type: Number }
});

const userSchema = new mongoose.Schema({
    imei: { type: Number },
    kawachId: { type: String },
    accountDob: { type: String },
    last50kData: [dataSchema] 
}, { collection: 'user' });

const User = mongoose.model('User', userSchema);

async function main() {
    const userEnt= "Teresa69Test"

    const user= await User.findOne({kawachId: userEnt})
    if(user) {
        console.log(user.imei, user.accountDob, user.last50kData);
    }
}

var lat= 0.0, long= 0.0;
var currUser= null;

app.post("/student", async function (req, res) {
    const kaw= req.body.kawach;
    const im= req.body.imei;
    
    const foundUser= await User.findOne({imei: im});
    currUser= foundUser;

    if(foundUser) {
        console.log(foundUser);
        lat= foundUser.latitude;
        long= foundUser.longitude;
    }

    res.redirect("/")
})

app.post('/coordinates', async (req, res) => {
    try {
        const imei = req.body.imei;
        const user = await User.findOne({ imei: imei });
        const sortedData = user.last50kData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        console.log(user.kawachId);
        
        if (sortedData.length > 0) {
            const { latitude, longitude } = sortedData[0];
            console.log('Returning data:', { latitude, longitude });
            res.json({ latitude, longitude });
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (err) {
        console.error('Error:', err.message); // Log error message
        res.status(500).json({ error: err.message });
    }
});

app.get("/", function (req, res) {
    res.render("index.ejs");
})

app.listen(8080, function() {
    console.log("Server listening on port: 8080");
})