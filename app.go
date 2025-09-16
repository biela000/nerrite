package main

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
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

	db, err := dbConnect()
	a.db = db

	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}
}

func (a *App) shutdown(_ context.Context) {
	a.db.Close()
}

func dbConnect() (*sql.DB, error) {
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

func (a *App) CheckIfUserExists(name string) (bool, error) {
	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM user WHERE name = ?)"
	err := a.db.QueryRow(query, name).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (a *App) LoginUser(name string, password string) (string, error) {
	var storedPassword string
	query := "SELECT password FROM user WHERE name = ?"
	err := a.db.QueryRow(query, name).Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			return a.CreateUser(name, password)
		}
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))
	if err != nil {
		return "", err
	}
	a.sessionPassword = password

	return "Login successful", nil
}

func (a *App) CreateUser(name string, password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password), bcrypt.DefaultCost,
	)
	if err != nil {
		return "", err
	}
	query := "INSERT INTO user (name, password) VALUES (?, ?)"
	_, err = a.db.Exec(query, name, string(hashedPassword))
	if err != nil {
		return "", err
	}
	a.sessionPassword = password
	return "User created successfully", nil
}
