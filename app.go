package main

import (
	"context"
	"fmt"
        "database/sql"
          

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx             context.Context
	db              *sql.DB
	sessionPassword string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	db, err := DbConnect()
	a.db = db

	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}
}

func (a *App) shutdown(_ context.Context) {
	a.db.Close()
}

