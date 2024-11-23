package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() *gin.Engine {
    r := gin.Default()

    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173", "https://encrypt-share-rose.vercel.app"},
        AllowMethods:     []string{"GET", "POST", "OPTIONS"},
        AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
        AllowCredentials: true,
    }))

    r.POST("/encrypt", s.EncryptHandler)
    r.GET("/decrypt", s.DecryptHandler)

    return r
}