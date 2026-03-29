// Import TweetNaCl.js
import nacl from 'tweetnacl';
import utf8 from 'tweetnacl-util';

/**
 * Encrypts a message using a provided key.
 * @param {string} message - The message to encrypt.
 * @param {Uint8Array} key - The key to use for encryption.
 * @returns {string} - The encrypted message in base64 format.
 */
export function encryptMessage(message, key) {
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const messageUint8 = utf8.encode(message);
    const box = nacl.secretbox(messageUint8, nonce, key);
    const combined = new Uint8Array(nonce.length + box.length);
    combined.set(nonce);
    combined.set(box, nonce.length);
    return utf8.encode(combined);
}

/**
 * Decrypts a message using a provided key.
 * @param {string} encryptedMessage - The encrypted message in base64 format.
 * @param {Uint8Array} key - The key to use for decryption.
 * @returns {string} - The decrypted message.
 */
export function decryptMessage(encryptedMessage, key) {
    const combined = utf8.decode(encryptedMessage);
    const nonce = combined.slice(0, nacl.secretbox.nonceLength);
    const box = combined.slice(nacl.secretbox.nonceLength);
    const messageUint8 = nacl.secretbox.open(box, nonce, key);
    return utf8.encode(messageUint8);
}
