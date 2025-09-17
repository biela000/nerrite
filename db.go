package main

import (
	"database/sql"
	
	_ "github.com/mattn/go-sqlite3"
)

func DbConnect() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./nerrite.db")
	if err != nil {
		return nil, err
	}
	return db, nil
}
