package server

import (
	"encoding/base64"
	"encrypt-share/internal/crypto"
	"encrypt-share/internal/database"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Server struct {
    db *database.Database
}

func NewServer(db *database.Database) *Server {
    return &Server{
        db: db,
    }
}


func (s *Server) EncryptHandler(c *gin.Context) {
    var request struct {
        Text string `json:"text"`
    }
    
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    id := uuid.New().String()
    
    key, err := crypto.GenerateKey()
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    encryptedText, err := crypto.Encrypt(request.Text, key)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    encodedKey := base64.URLEncoding.EncodeToString(key)        
    
    err = s.db.SaveMessage(id, encryptedText)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "id": id,
        "key": encodedKey,
    })
}

func (s *Server) DecryptHandler(c *gin.Context) {
    id := c.Query("id")
    key := c.Query("key")
    
    if id == "" || key == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Missing id or key parameter"})
        return
    }

    encrypted_text, err := s.db.GetMessage(id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    decodedKey, err := base64.URLEncoding.DecodeString(key)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid key format"})
        return
    }
    
    text, err := crypto.Decrypt(encrypted_text, decodedKey)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    go s.db.DecrementSession(id)
    
    c.JSON(http.StatusOK, gin.H{"text": text})
}