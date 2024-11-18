package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type EncryptRequest struct {
    Text string `json:"text"`
}

func main() {
    r := gin.Default()
    
    r.GET("/encrypt", func(c *gin.Context) {  
        var request EncryptRequest
        
        if err := c.ShouldBindJSON(&request); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }
        
        c.JSON(http.StatusOK, gin.H{
            "text": request.Text,
        })
    })
    
    r.Run()
}


// listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")