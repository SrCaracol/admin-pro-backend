const{OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SECRET);

async function googleVerify(id_token){
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_ID,  
    });
    const payload = ticket.getPayload();
    console.log({payload});
    return payload;
}
googleVerify().catch(console.error);

module.exports = {
    googleVerify
}