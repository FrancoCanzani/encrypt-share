package server

import (
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

type IPRateLimiter struct {
    ips map[string]*rate.Limiter
    mu  *sync.RWMutex
    r   rate.Limit
    b   int
}

func NewIPRateLimiter(r rate.Limit, b int) *IPRateLimiter {
    return &IPRateLimiter{
        ips: make(map[string]*rate.Limiter),
        mu:  &sync.RWMutex{},
        r:   r,
        b:   b,
    }
}

func (i *IPRateLimiter) GetLimiter(ip string) *rate.Limiter {
    i.mu.Lock()
    defer i.mu.Unlock()

    limiter, exists := i.ips[ip]
    if !exists {
        limiter = rate.NewLimiter(i.r, i.b)
        i.ips[ip] = limiter
    }

    return limiter
}

func (s *Server) RegisterRoutes() *gin.Engine {
    r := gin.Default()

    r.Use(gin.Recovery())
    r.Use(gin.Logger())

    limiter := NewIPRateLimiter(rate.Limit(60/60.0), 1)

    // Rate limiter middleware
    r.Use(func(c *gin.Context) {
        limiter := limiter.GetLimiter(c.ClientIP())
        if !limiter.Allow() {
            c.JSON(429, gin.H{
                "error": "Too many requests. Please try again later.",
            })
            c.Abort()
            return
        }
        c.Next()
    })

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