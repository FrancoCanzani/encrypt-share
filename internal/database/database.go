package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type Database struct {
    db *sql.DB
}

func NewDatabase(dbPath string) (*Database, error) {
    db, err := sql.Open("sqlite3", dbPath)
    if err != nil {
        return nil, err
    }

    if err := createTables(db); err != nil {
        return nil, err
    }

    return &Database{db: db}, nil
}

func createTables(db *sql.DB) error {
    log.Println("Creating tables...") 
    query := `
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            encrypted_text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            sessions INTEGER DEFAULT 1
        );
    `
    _, err := db.Exec(query)
    if err != nil {
        log.Printf("Error creating tables: %v", err)  
        return err
    }
    log.Println("Tables created successfully")  
    return err
}

func (d *Database) SaveMessage(id, text string) error {
    query := `INSERT INTO messages (id, encrypted_text) VALUES (?, ?)`
    _, err := d.db.Exec(query, id, text)
    return err
}

func (d *Database) GetMessage(id string) (string, error) {
    var text string  
    query := `SELECT encrypted_text FROM messages WHERE id = ?`
    err := d.db.QueryRow(query, id).Scan(&text)  // Only scan text
    return text, err
}

func (d *Database) DecrementSession(id string) error {
    query := `
        UPDATE messages 
        SET sessions = sessions - 1 
        WHERE id = ? AND sessions > 0
    `
    result, err := d.db.Exec(query, id)
    if err != nil {
        return err
    }

    rows, _ := result.RowsAffected()
    if rows > 0 {
        query = `DELETE FROM messages WHERE id = ? AND sessions <= 0`
        _, err = d.db.Exec(query, id)
    }
    return err
}
