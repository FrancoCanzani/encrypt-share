package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
)

func GenerateKey() ([]byte, error) {
    key := make([]byte, 32)
    _, err := rand.Read(key)
    if err != nil {
        return nil, err    
    }
    return key, nil
}

func Encrypt(plaintext string, key []byte) (string, error) {
    // Convert plaintext to bytes
    plaintextBytes := []byte(plaintext)
    
    // Create cipher block
    block, err := aes.NewCipher(key)
    if err != nil {
        return "", err
    }
    
    // Create GCM mode
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return "", err
    }
    
    // Create nonce (number used once)
    nonce := make([]byte, gcm.NonceSize())
    _, err = rand.Read(nonce)
    if err != nil {
        return "", err
    }
    
    // Encrypt and combine nonce + ciphertext
    ciphertext := gcm.Seal(nonce, nonce, plaintextBytes, nil)
    
    // Encode to base64 for URL
    return base64.URLEncoding.EncodeToString(ciphertext), nil
}


func Decrypt(encryptedText string, key []byte) (string, error) {
    // Decode base64 back to bytes
    ciphertext, err := base64.URLEncoding.DecodeString(encryptedText)
    if err != nil {
        return "", err
    }
    
    // Create cipher block (same as encrypt)
    block, err := aes.NewCipher(key)
    if err != nil {
        return "", err
    }
    
    // Create GCM mode (same as encrypt)
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return "", err
    }
    
    // Extract nonce from ciphertext
    nonceSize := gcm.NonceSize()
    if len(ciphertext) < nonceSize {
        return "", errors.New("ciphertext too short")
    }
    
    nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
    
    // Decrypt
    plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
    if err != nil {
        return "", err
    }
    
    return string(plaintext), nil
}