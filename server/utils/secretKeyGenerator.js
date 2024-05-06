// Secret key for signing cookies.
function generateKey(length){
    const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const setSize = CHAR_SET.length;
    let key = "";
    for (let i = 0; i < length; i++){
        let index = Math.floor(Math.random() * setSize);
        key += CHAR_SET[index];
    }
    return key;
}

const SECRET_KEY = generateKey(20);

module.exports = SECRET_KEY;