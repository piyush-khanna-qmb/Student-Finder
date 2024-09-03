const handleIfUserExists = async (req, res) => {
    const kaw= req.body.KawachID;
    const im= req.body.IMEI;
    
    try {
        const foundUser= await User.findOne({imei: im});
        if(foundUser.kawachId == kaw) {
            //Authentic user hai
            return res.status(200).json({msg: "OK", success: true});
        }
        else {
            return res.status(401).json({ error: 'Authentication failed: KawachId and IMEI code do not match', success: false});
        }
    } catch (err){
        return res.status(401).json({ error: 'Authentication failed: KawachId and IMEI code do not match', success: false});
    }
}

module.exports = {
    handleIfUserExists
}