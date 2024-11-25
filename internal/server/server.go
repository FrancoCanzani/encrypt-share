package server

import (
	"encoding/base64"
	"encrypt-share/internal/crypto"
	"encrypt-share/internal/database"
	"errors"
	"html"
	"net/http"
	"strings"
	"unicode"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
   MaxTextLength = 10000
   MinTextLength = 1
)

var (
   ErrTextTooLong = errors.New("text exceeds maximum length")
   ErrTextEmpty = errors.New("text cannot be empty")
   ErrInvalidChars = errors.New("text contains invalid characters")
)

type Server struct {
   db *database.Database
}

func NewServer(db *database.Database) *Server {
   return &Server{
       db: db,
   }
}

func sanitizeAndValidateText(text string) (string, error) {
   text = strings.TrimSpace(text)
   
   if len(text) == 0 {
       return "", ErrTextEmpty
   }
   
   if len(text) > MaxTextLength {
       return "", ErrTextTooLong
   }
   
   text = html.EscapeString(text)
   
   var sanitized strings.Builder
   for _, r := range text {
       if unicode.IsPrint(r) && !unicode.IsControl(r) {
           sanitized.WriteRune(r)
       } else {
           return "", ErrInvalidChars
       }
   }
   
   return sanitized.String(), nil
}

func (s *Server) EncryptHandler(c *gin.Context) {
   var request struct {
       Text string `json:"text"`
   }
   
   if err := c.ShouldBindJSON(&request); err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
       return
   }
   
   sanitizedText, err := sanitizeAndValidateText(request.Text)
   if err != nil {
       switch err {
       case ErrTextEmpty:
           c.JSON(http.StatusBadRequest, gin.H{"error": "Message cannot be empty"})
       case ErrTextTooLong:
           c.JSON(http.StatusBadRequest, gin.H{"error": "Message is too long"})
       case ErrInvalidChars:
           c.JSON(http.StatusBadRequest, gin.H{"error": "Message contains invalid characters"})
       default:
           c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid message format"})
       }
       return
   }
   
   id := uuid.New().String()
   
   key, err := crypto.GenerateKey()
   if err != nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate key"})
       return
   }

   encryptedText, err := crypto.Encrypt(sanitizedText, key)
   if err != nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt message"})
       return
   }

   encodedKey := base64.URLEncoding.EncodeToString(key)        
   
   err = s.db.SaveMessage(id, encryptedText)
   if err != nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message"})
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
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Message not found"})
       return
   }
   
   decodedKey, err := base64.URLEncoding.DecodeString(key)
   if err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid key format"})
       return
   }
   
   text, err := crypto.Decrypt(encrypted_text, decodedKey)
   if err != nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decrypt message"})
       return
   }

   go s.db.DecrementSession(id)
   
   c.JSON(http.StatusOK, gin.H{"text": text})
}