package main

import (
	"encoding/base64"
	"encrypt-share/internal/crypto"
	"encrypt-share/internal/database"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/google/uuid"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type EncryptRequest struct {
    Text string `json:"text"`
}

type DecryptRequest struct {
    Id string `json:"id"`
    Key string `json:"key"`
}

func main() {
    db, err := database.NewDatabase("internal/database/data.db")
    if err != nil {
        log.Fatal(err)
    }

    r := gin.Default()

    config := cors.DefaultConfig()
    config.AllowAllOrigins = true  // For development. In production, specify your domains
    config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
    
    r.Use(cors.New(config))
    
    r.POST("/encrypt", func(c *gin.Context) {  
        var request EncryptRequest
        
        if err := c.ShouldBindJSON(&request); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }
        
        // Generate unique ID
        id := uuid.New().String()
        
        key, err := crypto.GenerateKey()
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }
    
        encryptedText, err := crypto.Encrypt(request.Text, key)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": err.Error(),
            })
            return
        }
    
        encodedKey := base64.URLEncoding.EncodeToString(key)        
        
        err = db.SaveMessage(id, encryptedText)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": err.Error(),
            })
            return
        }
    
        c.JSON(http.StatusOK, gin.H{
            "id": id,
            "key": encodedKey,
        })
    })
    
    r.GET("/decrypt", func(c *gin.Context) {  
        id := c.Query("id")
        key := c.Query("key")
        
        if id == "" || key == "" {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Missing id or key parameter",
            })
            return
        }
    
        encrypted_text, err := db.GetMessage(id)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": err.Error(),
            })
            fmt.Println(err)
            return
        }
        
        decodedKey, err := base64.URLEncoding.DecodeString(key)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Invalid key format",
            })
            return
        }
        
        text, err := crypto.Decrypt(encrypted_text, decodedKey)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "error": err.Error(),
            })
            return
        }
    
        go db.DecrementSession(id)
        
        c.JSON(http.StatusOK, gin.H{
            "text": text,
        })
    })

    r.Run()
}