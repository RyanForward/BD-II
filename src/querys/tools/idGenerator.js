const crypto = require('crypto');

function generateID(input) {
    console.log('INPUT: ', input);
    const hash = crypto.createHash('sha256').update(input.toString()).digest('hex');
    const truncatedHash = hash.substring(0, 16); 
    const id = BigInt(`0x${truncatedHash}`) % BigInt('9223372036854775807'); 
    return id.toString();
}

module.exports = { generateID };
