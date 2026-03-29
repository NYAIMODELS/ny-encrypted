// utils/encryption.js

const nacl = require('tweetnacl');
const convert = require('tweetnacl-util');

/**
 * Encrypts a message using a given key.
 * @param {string} message - The message to be encrypted.
 * @param {Uint8Array} key - The key used for encryption.
 * @returns {string} - The encrypted message in base64 format.
 */
function encryptMessage(message, key) {
    const nonce = nacl.randomBytes(nacl.box.nonceLength);
    const messageUint8 = convert.decodeUTF8(message);
    const encrypted = nacl.box(messageUint8, nonce, key.publicKey, key.secretKey);
    const encryptedMessage = convert.encodeBase64(encrypted);
    const nonceBase64 = convert.encodeBase64(nonce);
    return nonceBase64 + ':' + encryptedMessage;
}

/**
 * Decrypts an encrypted message using a given key.
 * @param {string} encryptedData - The encrypted message in base64 format.
 * @param {Uint8Array} key - The key used for decryption.
 * @returns {string} - The decrypted message.
 */
function decryptMessage(encryptedData, key) {
    const [nonceBase64, encryptedMessage] = encryptedData.split(':');
    const nonce = convert.decodeBase64(nonceBase64);
    const encryptedUint8 = convert.decodeBase64(encryptedMessage);
    const decrypted = nacl.box.open(encryptedUint8, nonce, key.publicKey, key.secretKey);
    return convert.encodeUTF8(decrypted);
}

module.exports = { encryptMessage, decryptMessage };