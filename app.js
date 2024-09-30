const prompt = require('prompt-sync')();
require('dotenv').config();
const ejs = require("ejs")
const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose');
// const {router} = require('./routes/dataRoutes');
const app= express()
const port =  process.env.PORT|| 8080;
const API_KEY= process.env.API_KEY;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/'));

// #region DATABASE
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
    speed: { type: Number },
    signalStrength: { type: Number }
});

const userSchema = new mongoose.Schema({
    imei: { type: Number },
    kawachId: { type: String },
    accountDob: { type: String },
    last50kData: [dataSchema] 
}, { collection: 'user' });

const User = mongoose.model('User', userSchema);
//#endregion

// #region HELPER FUNCTIONS
function isActive(timestamp) {
    const givenTime = new Date(timestamp);
    const currentTime = new Date();

    const differenceInMilliseconds = Math.abs(currentTime - givenTime);
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours < 3;
}

function getCreationTime() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDateTime = `${year}/${month}/${day}`;
    return formattedDateTime;
}
//#endregion

// #region APIs
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

app.post("/api/v1/getCoordinatesByKawachID", async function (req, res) {
    try {
        const kaw = req.body.kawachID;
        const user = await User.findOne({ kawachId: kaw });
        const sortedData = user.last50kData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        // console.log(user.imei);
        
        if (sortedData.length > 0) {
            const { latitude, longitude } = sortedData[0];
            // console.log('Returning data:', { latitude, longitude });
            return res.json({ position: {lat: latitude, lng: longitude }});
        } else {
            res.status(404).json({ error: 'No data found for given kawachID' });
        }
    } catch (err) {
        console.error('No such kawach ID found:', err.message); // Log error message
        res.status(500).json({ error: err.message });
    }
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
            return res.json({ lat: latitude, lng: longitude });
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (err) {
        console.error('Error:', err.message); // Log error message
        res.status(500).json({ error: err.message });
    }
});

// app.use("/api/v1/data", router);

app.post("/api/v1/ifUserExists", async function (req, res) {
    const kaw= req.body.KawachID;
    const im= req.body.IMEI;
    
    try {
        const foundUser= await User.findOne({imei: im});
        if(foundUser.kawachId == kaw) {
            return res.status(200).json({exists: true});    //IMEI and KawachID exist and are linked
        }
        else {
            return res.status(404).json({ exists: false }); //IMEI exists but KawachID linked is wrong
        }
    } catch (err){
        return res.status(500).json({exists: false});  // Internal Server Error
    }
})

app.post("/api/v1/registrationCheck", async function (req, res) {
    const kawachID = req.body.KawachID; 
    const imei = req.body.IMEI; 
    
    try { 
        const foundUser = await User.findOne({ imei: imei });
        
        if (foundUser) {
            if (foundUser.kawachId === kawachID) {
                return res.status(401).json({ exists: true, message: "User already exists. Please try logging in." }); // User exist karta hai with both IMEI and KawachID matching
            } 
            
            else {
                return res.status(401).json({ exists: true, message: "IMEI already exists. Please check credentials and try logging in." }); // IMEI exists, par KawachID does not match
            }
        } 
        
        const foundKawach = await User.findOne({ kawachId: kawachID });
        if (foundKawach) {
            return res.status(401).json({ exists: true, message: "KawachID already exists. Please check credentials and try logging in." }); //  KawachID exist karti hai in DB but IMEI does not match
        }

        return res.status(200).json({ exists: false }); // Neither IMEI nor KawachID exists. Completely New user

    } catch (err) {
        return res.status(500).json({ error: "Internal server error." });
    }
});


app.post("/api/test/logToken", function (req, res) {
    const tok= req.body.token;
    console.log(`\n==> Device token is: ${tok}\n`);
    res.status(202).send("OK boii 👍🏻");
})

app.post("/api/v1/getStaticData", async function (req, res) {
    const kaw= req.body.KawachID;
    const im= req.body.IMEI;
    
    try {
        const foundUser= await User.findOne({imei: im});
        if(foundUser.kawachId == kaw) {
            //Authentic user hai
            const latestLatitude= foundUser.last50kData[0].latitude;
            const latestLongitude= foundUser.last50kData[0].longitude;
            const accountDob= foundUser.accountDob;
            const status= isActive(foundUser.last50kData[0].timestamp);

            const response = {
                status: status,
                latestLatitude: latestLatitude,
                latestLongitude: latestLongitude,
                accountDob: accountDob,
                success: true
            };
            return res.status(200).json(response);
        }
        else {
            return res.status(401).json({ error: 'Authentication failed: KawachId and IMEI code do not match', success: false});
        }
    } catch (err) {
        return res.status(404).json({error: 'User not found', success: false});
    }
})

app.post("/api/v1/getMarkerData", async function (req, res) {
    const kaw= req.body.KawachID;
    const im= req.body.IMEI;
    
    try {
        const foundUser= await User.findOne({imei: im});
        if(foundUser.kawachId == kaw) {
            //Authentic user hai
            const latestLatitude= foundUser.last50kData[0].latitude;
            const latestLongitude= foundUser.last50kData[0].longitude;
            const latestBattery= foundUser.last50kData[0].battery;
            const latestSpeed= foundUser.last50kData[0].speed;
            const latestSignalStrength= foundUser.last50kData[0].signalStrength;

            const response = {
                latitude: latestLatitude,
                longitude: latestLongitude,
                battery: latestBattery,
                speed: latestSpeed,
                signalStrength: latestSignalStrength,
                success: true
            };
            return res.json(response);
        }
        else {
            return res.status(401).json({ error: 'Authentication failed: KawachId and IMEI code do not match', success: false});
        }
    } catch (err){
        return res.status(404).json({error: 'User not found', success: false});
    }
})

app.post("/api/v1/getPhoneNumber", function (req, res) {
    const kaw= req.body.KawachID;
    let phoneDict= {
        "test101": "+918755122371",
        "test102": "+918755916729",
        "test103": "+918586827629",
        "test104": "+919457138020",
        "test105": "+919760775209"
    }
    if(kaw in phoneDict) {
        return res.status(200).json({mobile_number: phoneDict[kaw], success: true});
    } else {
        return res.status(404).json({error: "KawachID not present in phone dictionary", success: false});
    }
})

app.post("/api/v1/createUser", async function (req, res) {
    const kaw= req.body.KawachID;
    const im= req.body.IMEI;
    const dob= getCreationTime();

    const newUser = new User({
        imei: im,
        kawachId: kaw,
        accountDob: dob,
        last50kData: []  
    });

    try {
        const savedUser = await newUser.save();
        console.log('New user added:', savedUser);
        return res.status(201).json({msg: "New user added to DB successfully!", success: true});
    } catch (error) {
        console.error('Error adding new user:', error);
        return res.status(500).json({error: "User couldn't be saved to DB due to internal connection error", success: false});
    }
})

//#endregion

app.get("/", function (req, res) {
    res.render("index2.ejs", {API_KEY: API_KEY});
})

app.get("/highAlert", function (req, res) {
    res.render("highalert.ejs", {API_KEY: API_KEY, schoolCode: 123})
})

app.get("/:schoolCode/high-alert", async function (req, res) {
    const schoolCode= req.params.schoolCode;
    console.log("School name: ", schoolCode);
    res.render("highalert.ejs", {API_KEY: API_KEY, schoolCode: schoolCode})
})

app.listen(port, function() {
    console.log("Server listening on port:", port);
})