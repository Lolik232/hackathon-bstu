package main

import (
	"context"
	"fmt"
	question "github.com/Lolik232/hackathon-bstu/pkg/struct/question/single"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/slog"
	"log"
	"math/rand"
	"net/http"
)

func testStart() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
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

func FindSingleFromDB() question.Single {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := question.NewRepository(pgSQLClient, &logger)
	all, err := repository.FindOne(context.TODO(), 1)
	if err != nil {
		logger.Info("Error")
	}

	return all
}

func FindAllSingles(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, FindAllSinglesFromDB())
}

func startSer() {
	server := gin.Engine{}
	server.Run(":8080")
	server.GET("/single", FindAllSingles)
}

func AddSingleToBd(single question.Single) {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := question.NewRepository(pgSQLClient, &logger)
	err = repository.Create(context.Background(), &single)
	if err != nil {
		logger.Info("Error")
	}
}

// StudyTest - хранение теста в бд для отправки на тестирование
type StudyTest struct {
	Id           int   // id теста бд потом в uuid переделать
	IdCompetence int   // id компетенции для сортировки по ней
	IdQuestion   []int // id вопросов бд потом в uuid переделать
	AnsType      []int // типы вопросов
}

// StudyTestResult - получение результата тестирования
type StudyTestResult struct {
	Id         int      // id теста бд потом в uuid переделать
	IdUser     int      // id студента который прошел тест
	IdQuestion []int    // id вопросов бд потом в uuid переделать
	AnsType    []int    // типы вопросов
	Answers    []string // ответы студента на вопросы
}

func GetIdQuestion(q []question.Single) []int {
	id := make([]int, 0)
	for i := range q {
		id = append(id, q[i].Id)
	}

	return id
}

func (st *StudyTest) CrateStudyTest() {
	st.Id = rand.Int()
	st.IdCompetence = 1
	st.IdQuestion = GetIdQuestion(FindAllSinglesFromDB())
	st.AnsType = []int{1, 1, 1}
}

func (st *StudyTest) Print() {

}

func aa() {
	var st StudyTest
	st.CrateStudyTest()
	fmt.Println(st)
}

func main() {
	aa()
}
