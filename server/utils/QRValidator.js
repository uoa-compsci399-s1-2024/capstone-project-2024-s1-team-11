const Users_Rocks = require('../models');

async function isFromQRCode(userId, rockId) {
    try {
        // Not sure of this logic yet, but likely need a set QR code for each rock in the database for this to work
        const userRock = await Users_Rocks.findOne({ where: { user_id: userId, rock_id: rockId } });
        return userRock !== null;
    } catch (error) {
        console.error("Error checking if user came from QR code:", error);
        return false; // Return false in case of error
    }
}
// Add more authentication-related functions as needed

module.exports = { isFromQRCode };
