package main

import (
	"context"
	"fmt"
	question "github.com/Lolik232/hackathon-bstu/pkg/struct/question/single"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/slog"
	"log"
	"net/http"
)

func testStart() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))

	buf := FindAllSinglesFromDB()
	http.Post("/singles", "text/json", &buf)
}

func FindAllSinglesFromDB() []question.Single {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := question.NewRepository(pgSQLClient, &logger)
	all, err := repository.FindAll(context.TODO())
	if err != nil {
		logger.Info("Error")
	}

	return all
}

func FindAllSingles(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, FindAllSinglesFromDB())
}

func main() {
	testStart()
}
