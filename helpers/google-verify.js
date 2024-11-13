const{OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SECRET);

async function googleVerify(id_token){
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_ID,  
    });
    const payload = ticket.getPayload();
    const {name, email, picture} = payload;
    return {name, email, picture};
}
googleVerify().catch(console.error);

module.exports = {
    googleVerify
}