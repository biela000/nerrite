package main

import (
        "database/sql"
          

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"

)

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
