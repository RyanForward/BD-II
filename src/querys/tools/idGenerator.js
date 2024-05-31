const crypto = require('crypto'); 

export function generateID(input) {
    const hash = crypto.createHash('sha256').update(input.toString()).digest('hex');
    const truncatedHash = hash.substring(0, 9); 
    const id = parseInt(truncatedHash, 16) + input;
    return id;
}