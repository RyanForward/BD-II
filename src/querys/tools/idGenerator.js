const crypto = require('crypto'); 

function generateID(input) {
    const hash = crypto.createHash('sha256').update(input.toString()).digest('hex');
    const truncatedHash = hash.substring(0, 12); 
    const id = parseInt(truncatedHash, 16) + input;
    console.log('ID: ', id)
    return id;
}

module.exports = {generateID}