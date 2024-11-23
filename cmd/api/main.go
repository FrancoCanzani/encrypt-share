package main

import (
	"encrypt-share/internal/database"
	"encrypt-share/internal/server"
	"log"
	"os"
)

func main() {
    dbPath := os.Getenv("DB_PATH")
    if dbPath == "" {
        // Fallback for local development
        dbPath = "internal/database/data.db"
    }

    db, err := database.NewDatabase(dbPath)
    if err != nil {
        log.Fatal(err)
    }

    srv := server.NewServer(db)
    r := srv.RegisterRoutes()
    r.Run()
}