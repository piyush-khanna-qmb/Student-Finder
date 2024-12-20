const prompt = require('prompt-sync')();
require('dotenv').config();
const ejs = require("ejs")
const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose');
// const {router} = require('./routes/dataRoutes');
const app= express()
const port =  process.env.PORT || 8050;
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

const versionSchema = new mongoose.Schema({
    minRequiredVersion: { type: String }
}, { collection: 'version' });

const User = mongoose.model('User', userSchema);
const Version = mongoose.model('Version', versionSchema);
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
        console.log("Finding for", kaw);
        
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

function getRandomLoc(min, max) {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(7));
}

app.post("/internal/api/v1/getCoordinatesByKawachID", async function (req, res) {

    try {
        const kaw = req.body.kawachID;
        
        const user = await User.findOne({ kawachId: kaw });
        if (user) {
            
            const sortedData = user.last50kData;;
            
            if (sortedData.length > 0) {
                const { latitude, longitude } = sortedData[0];
                return res.json({ position: {lat: latitude, lng: longitude }});
            } else {
                return res.status(404).json({ error: 'No data found for given kawachID' });
            }
        }
        else {
            var raandLat = getRandomLoc(28.87, 28.88);
            var raandLng= getRandomLoc(77.60, 77.63);
            return res.json({ rand: true,position: {lat: raandLat, lng: raandLng }})
        }
    } catch (err) {
        console.error('No such kawach ID found:', err.message); // Log error message
        return res.status(500).json({ error: err.message });
    }
})
app.post("/internal/api/v1/getCoordinatesInBundle", async function (req, res) {
    var returnBundle = [];
    try {
        const kawaches = req.body.kawachID;
        
        // Use Promise.all to handle multiple async operations concurrently
        returnBundle = await Promise.all(kawaches.map(async (kawachId) => {
            const user = await User.findOne({ kawachId: kawachId });
            
            if (user && user.last50kData && user.last50kData.length > 0) {
                const { latitude, longitude } = user.last50kData[0];
                return { position: { lat: latitude, lng: longitude }};
            } else {
                const raandLat = getRandomLoc(28.87, 28.88);
                const raandLng = getRandomLoc(77.60, 77.63);
                return { rand: true, position: { lat: raandLat, lng: raandLng }};
            }
        }));

        return res.status(200).json({ returnBundle });
        
    } catch (err) {
        console.error('Error processing kawach IDs:', err.message);
        return res.status(500).json({ returnBundle });
    }
});

app.post('/coordinates', async (req, res) => {
    try {
        const kawwach = req.body.kawachId;
        const user = await User.findOne({ kawachId: kawwach });
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

app.post('/checkedCoordinates', async (req, res) => {
    try {
        const kawachId = req.body.imei; // Waha se ulta bhijwa rha hai data. Don't worry. Ye line theek hai.
        const comingSchoolCode = req.body.schoolCode;
        const user = await User.findOne({ kawachId: kawachId });
        if (user) {
            const sortedData = user.last50kData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            fetch(`https://api.mykawach.com/api/Admin/GetStudentByKawachId/${kawachId}`, {
                method: 'GET',
                headers: { 'Accept': '*/*' }
            })
            .then(response => {
                if (!response.ok) throw new Error(`Error hai ji at line no 138`);
                return response.json();
            })
            .then(data => {
                if(data.schoolCode == comingSchoolCode) {
                    if (sortedData.length > 0) {
                        console.log(sortedData[0]);
                        
                        const { latitude, longitude } = sortedData[0];
                        return res.json({ lat: latitude, lng: longitude });
                    } else {
                        return res.status(404).json({ error: 'No data found' });
                    }
                } else {
                    return res.status(401).json({ error: 'Trying to access kawachID of another school' });
                }
            })
            .catch(error => console.error('Failed to fetch school code:', error));
            
        } else {
            return res.status(404).json({error: "User Not Found!"});
        }
        
    } catch (err) {
        console.error('Error:', err.message); // Log error message
        res.status(500).json({ error: err.message });
    }
});

app.post('/uncheckedCoordinates', async (req, res) => {
    try {
        const kawachId = req.body.imei; // Waha se ulta bhijwa rha hai data. Don't worry. Ye line theek hai.
        const comingSchoolCode = "dps01";
        const user = await User.findOne({ kawachId: kawachId });
        if (user) {
            const sortedData = user.last50kData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            
            if(comingSchoolCode == "dps01") {
                if (sortedData.length > 0) {
                    const { latitude, longitude } = sortedData[0];
                    return res.json({ lat: latitude, lng: longitude });
                } else {
                    return res.status(404).json({ error: 'No data found' });
                }
            } else {
                return res.status(401).json({ error: 'Trying to access kawachID of another school' });
            }
            
        } else {
            return res.status(404).json({error: "User Not Found!"});
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
        if(foundUser && foundUser.kawachId == kaw) {
            return res.status(200).json({exists: true});    //IMEI and KawachID exist and are linked
        }
        else {
            return res.status(404).json({ exists: false }); //IMEI exists but KawachID linked is wrong
        }
    }
    catch (err){
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
        last50kData: [
            {
                latitude: 28.615881,
                longitude: 77.374889,
                altitude: 0,
                timestamp: "2024/08/23 11:15:24",
                battery: 0,
                speed: 0,
                signalStrength: -70
            }
        ]  
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

//#region MAKE-DO APIs

app.get("/api/Admin/GetStudentByKawachId/:kawachId", function (req, res) {
    const kaww= req.params.kawachId;
    try {
        return res.status(200).json({mobileNo: "8755916729", schoolId: 1, classId: 2, sectionId: 6});
    }
    catch {
        return res.status(500).json({error: "Koi baat ni ji. Change url from student-finder to actual azure."});
    }
})

//#endregion

//#region   MAJOR ROUTES

app.get("/:schoolCode/olahuakbar", async function (req, res) {
    const schoolCode= req.params.schoolCode;
    console.log("School name: ", schoolCode);
    res.render("indexOla.ejs", {API_KEY: API_KEY, schoolCode: schoolCode})
})

app.get("/", function (req, res) {
    res.render("index2.ejs", {API_KEY: API_KEY, schoolCode: 'dps01'});
})

app.get("/highAlert", function (req, res) {
    res.render("highalert.ejs", {API_KEY: API_KEY, schoolCode: 'dps01'})
})

app.get("/support", function (req, res) {
    res.render("support.ejs");
})

app.get("/:schoolCode/principal", async function (req, res) {
    const schoolCode= req.params.schoolCode;
    console.log("School name: ", schoolCode);
    res.render("index2.ejs", {API_KEY: API_KEY, schoolCode: schoolCode})
    // res.render("maintenancePage.ejs", { schoolCode: schoolCode})
})

app.get("/:schoolCode/tracking", async function (req, res) {
    const schoolCode= req.params.schoolCode;
    console.log("School name: ", schoolCode);
    res.render("index2.ejs", {API_KEY: API_KEY, schoolCode: schoolCode})
    // res.render("maintenancePage.ejs", { schoolCode: schoolCode})
})

app.get("/:schoolCode/high-alert", async function (req, res) {
    const schoolCode= req.params.schoolCode;
    console.log("School name: ", schoolCode);
    res.render("highalert.ejs", {API_KEY: API_KEY, schoolCode: schoolCode})
    // res.render("maintenancePage.ejs", { schoolCode: schoolCode})
})

app.listen(port, function() {
    console.log("Server listening on port:", port);
})

//#endregion

//#region Fake Move

const monthDict = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

async function insertDataForUser(insertableData) {
    const imei = insertableData.imei;
    console.log(`Searching for user with IMEI: ${imei}`);
    
    const user = await User.findOne({ imei: imei });
    
    if (!user) {
        console.log(`IMEI ${imei} not linked with a user yet.`);
        return;
    }

    console.log(`User found with IMEI: ${imei}`);
    const newData = {
        latitude: parseFloat(insertableData.lat),
        longitude: parseFloat(insertableData.lng),
        altitude: 0,
        timestamp: insertableData.time,
        battery: parseFloat(insertableData.battery),
        speed: parseFloat(insertableData.speed),
        signalStrength: parseFloat(insertableData.signal)
    };

    await User.updateOne(
        { imei: imei },
        {
            $push: {
                last50kData: {
                    $each: [newData],
                    $position: 0,
                    $slice: 50
                }
            }
        }
    );
    console.log(`New data added to user with IMEI: ${imei}`);
}

function getFormattedTime22() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

const locationPoints = {
    man: {
        imei: 861261027105820,
        lat: '28.615695422324865',
        lng: '77.37450595390965',
        speed: 10,
        time: getFormattedTime22(),
        battery: 68,
        signal: 20
    },
    point0: {
        imei: 861261027105820,
        lat: '28.61532810689114',
        lng: '77.37329359543004',
        speed: 20,
        time: getFormattedTime22(),
        battery: 68,
        signal: 15
    },
    pointA: {
        imei: 861261027105820,
        lat: '28.617808776950845',
        lng: '77.37355659957929',
        speed: 40,
        time: getFormattedTime22(),
        battery: 68,
        signal: 20
    },
    pointB: {
        imei: 861261027105820,
        lat: '28.617921794551414',
        lng: '77.36426542751408',
        speed: 30,
        time: getFormattedTime22(),
        battery: 68,
        signal: 20
    },
    pointC: {
        imei: 861261027105820,
        lat: '28.61807248449627',
        lng: '77.35506008613771',
        speed: 50,
        time: getFormattedTime22(),
        battery: 68,
        signal: 20
    },
    indus: {
        imei: 861261027105820,
        lat: '28.618769422675815',
        lng: '77.35506008614057',
        speed: 10,
        time: getFormattedTime22(),
        battery: 68,
        signal: 20
    }
};

// Helper function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/api/move/:location', async (req, res) => {
    try {
        const location = req.params.location.toLowerCase();
        if (locationPoints[location]) {
            await insertDataForUser(locationPoints[location]);
            let msgg = location=="man" ? `Moving marker to Manojava` : `Moving marker to Indus School`;
            res.json({ success: true, message: `${msgg}` });
        } else {
            res.status(400).json({ success: false, message: 'Invalid location' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/route/manojavaToIndus', async (req, res) => {
    try {
        await insertDataForUser(locationPoints.point0);
        await delay(10000);
        await insertDataForUser(locationPoints.pointA);
        await delay(15000);
        await insertDataForUser(locationPoints.pointB);
        await delay(40000);
        await insertDataForUser(locationPoints.pointC);
        await delay(40000);
        await insertDataForUser(locationPoints.indus);
        
        res.json({ success: true, message: 'Route manojavaToIndus completed' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/route/indusToMan', async (req, res) => {
    try {
        await insertDataForUser(locationPoints.indus);
        await delay(10000);
        await insertDataForUser(locationPoints.pointC);
        await delay(15000);
        await insertDataForUser(locationPoints.pointB);
        await delay(40000);
        await insertDataForUser(locationPoints.pointA);
        await delay(40000);
        await insertDataForUser(locationPoints.point0);
        await delay(20000);
        await insertDataForUser(locationPoints.man);
        
        res.json({ success: true, message: 'Route indusToMan completed' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/simulator', (req, res) => {
    res.render('simulator');
});


//#region Version Update

app.put('/putVersionUpdate', async (req, res) => {
    const newVersion = new Version({
        minRequiredVersion: req.body.minRequiredVersion
    });

    try {
        const savedVersion = await newVersion.save();
        // console.log('New version updated:', savedVersion);
        return res.status(201).json({msg: "New version update set successfully!", success: true});
    } catch (error) {
        // console.error('Error updating new version:', error);
        return res.status(500).json({error: "Version couldn't be updated to DB due to internal connection error", success: false});
    }
})

app.get('/getVersionUpdate', async (req, res) => {
    try {
        const latestVersion = await Version.findOne().sort({ _id: -1 }).exec();

        if (!latestVersion) {
            return res.status(404).json({ msg: "No version data found", success: false });
        }

        // console.log('Fetched version:', latestVersion);
        return res.status(200).json({ 
            minRequiredVersion: latestVersion.minRequiredVersion, 
            success: true 
        });
    } catch (error) {
        // console.error('Error fetching version:', error);
        return res.status(500).json({ 
            error: "Couldn't fetch version data due to an internal error", 
            success: false 
        });
    }
});


//#endregion