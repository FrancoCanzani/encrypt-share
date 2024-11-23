package main

import (
	"encrypt-share/internal/database"
	"encrypt-share/internal/server"
	"log"
)

func main() {
    db, err := database.NewDatabase("internal/database/data.db")
    if err != nil {
        log.Fatal(err)
    }

    srv := server.NewServer(db)
    r := srv.RegisterRoutes()
    r.Run()
}