package main

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx context.Context
	db  *sql.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	db, err := dbconnect()
	a.db = db

	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}
}

func (a *App) shutdown(_ context.Context) {
	a.db.Close()
}

func dbconnect() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./nerrite.db")
	if err != nil {
		return nil, err
	}
	return db, nil
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
