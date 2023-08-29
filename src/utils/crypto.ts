import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";

export function encrypt(rawCode: string): string {
    const cipher = createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(rawCode, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedCode: string): { restaurantId: string; role: string; } {
    const decipher = createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decryptedCode = decipher.update(encryptedCode, 'hex', 'utf8');
    decryptedCode += decipher.final('utf8');
    const [restaurantId, role] = decryptedCode.split('%');
    return { restaurantId, role };
}