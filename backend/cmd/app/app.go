package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"

	"github.com/Lolik232/hackathon-bstu/pkg/handler"
	question "github.com/Lolik232/hackathon-bstu/pkg/struct/question/single"
	"github.com/Lolik232/hackathon-bstu/pkg/utils/converter"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/exp/slog"
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

func FindSingleFromDB(id int) question.Single {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := question.NewRepository(pgSQLClient, &logger)
	all, err := repository.FindOne(context.TODO(), id)
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
	Id           int   `json:"id"`            // id теста бд потом в uuid переделать
	IdCompetence int   `json:"id_competence"` // id компетенции для сортировки по ней
	IdQuestion   []int `json:"id_question"`   // id вопросов бд потом в uuid переделать
	AnsType      []int `json:"ans_type"`      // типы вопросов
}

// StudyTestResult - получение результата тестирования
type StudyTestResult struct {
	Id         int      `json:"id"`          // id теста бд потом в uuid переделать
	IdUser     int      `json:"id_user"`     // id студента который прошел тест
	IdQuestion []int    `json:"id_question"` // id вопросов бд потом в uuid переделать
	AnsType    []int    `json:"ans_type"`    // типы вопросов
	Answers    []string `json:"answers"`     // ответы студента на вопросы
}

func GetIdQuestion(q []question.Single) []int {
	id := make([]int, 0)
	for i := range q {
		id = append(id, q[i].Id)
	}

	return id
}

const (
	qSingle     = iota // 0 одиночынй выбор
	qMultiple   = iota // 1 множественный выбор
	qSequencing = iota // 2 установление последовательности
	qAccordance = iota // 3 установление соответсвия
	qAddition   = iota // 4 с дополнением
	qFreeAnswer = iota // 5 свободный ответ
)

// возращает вопрос в JSON из БД по его id
func GetQuestionJSON(id int, t int) []byte {
	switch t {
	case qSingle:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qSingle)
		q, _ := json.Marshal(FindSingleFromDB(id))
		return q
	case qMultiple:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qMultiple)
	case qSequencing:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qSequencing)
	case qAccordance:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qAccordance)
	case qAddition:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qAddition)
	case qFreeAnswer:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qFreeAnswer)
	}

	return nil
}

func (st *StudyTest) CrateStudyTest() {
	st.Id = rand.Int()  // заглушка
	st.IdCompetence = 1 // заглушка
	st.IdQuestion = GetIdQuestion(FindAllSinglesFromDB())
	st.AnsType = []int{1, 1, 1} // заглушка
}

func (st *StudyTest) Print() {

}

func aa() {
	var st StudyTest
	st.CrateStudyTest()
	fmt.Println(st)
}

func aaa() {
	q := GetQuestionJSON(1, 0)
	str := string(q)
	fmt.Println(str)

	var s = question.Single{}
	err := json.Unmarshal(q, &s)
	if err != nil {
		log.Fatal("хуйня")
	}

	//ss := JSONToQuestion(q, 0)
	//fmt.Println(ss)
}

func testA() {
	q := GetQuestionJSON(1, 0)
	str := string(q)
	fmt.Println("Вопросв виде JSON:")
	fmt.Println(str)

	fmt.Println("Вопросв виде структуры Single:")
	que := converter.JSONToQuestion(q, 0)
	fmt.Println(que)
}

func HandleAuth(c *gin.Context) {
	username, ok := c.GetQuery("username")
	if !ok {
		c.JSON(http.StatusBadRequest, errors.New("invalid username"))
		return
	}
	password, ok := c.GetQuery("password")

	if !ok {
		c.JSON(http.StatusBadRequest, errors.New("invalid password"))
		return
	}
	// заглушка TODO: переписать!!!!!! только для тестов
	if username != "Lolik232@ya.ru" || password != "hash" {
		c.JSON(http.StatusBadRequest, errors.New("invalid password"))
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.RegisteredClaims{
			Issuer:    "",
			Subject:   "91c10478-2f2a-11ee-be56-0242ac120002",
			Audience:  []string{},
			ExpiresAt: &jwt.NumericDate{},
			NotBefore: &jwt.NumericDate{},
			IssuedAt:  &jwt.NumericDate{},
			ID:        "",
		},
	)

	// захардкодим пока ключик сюда
	jwtSigninKey := []byte("super-secret-key")

	// Sign and get the complete encoded token as a string using the secret
	tokenString, _ := token.SignedString(jwtSigninKey)

	responceMap := map[string]string{
		"token": tokenString,
	}

	c.JSON(http.StatusOK, responceMap)
}

func HandleUserData(c *gin.Context) {
	log.Println("user")
	// TODO: get user data by id
	_, ok := c.Params.Get(handler.UserIDContextKey)

	if !ok {
		c.JSON(http.StatusBadRequest, "")
		return
	}

	responceMap := map[string]string{
		"first_name": "Владислав",
		"last_name":  "Владислав",
		"mid_name":   "Владислав",
		"status":     "Студент",
	}

	c.JSON(http.StatusOK, responceMap)
}

type TokenValidator struct {
}

func main() {

	router := gin.Default()
	router.POST("/auth", HandleAuth)

	auth := router.Group("/")

	auth.Use(handler.GinAuthMiddleware())
	{
		auth.GET("/user", HandleUserData)
	}
	router.Run(":8080")

	// // Create a new token object, specifying signing method and the claims
	// // you would like it to contain.

	// token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	// 	"userId": "1",
	// 	"nbf":    time.Date(2015, 10, 10, 12, 0, 0, 0, time.UTC).Unix(),
	// })

	// // захардкодим пока ключик сюда
	// jwtSigninKey := []byte("super-secret-key")

	// // Sign and get the complete encoded token as a string using the secret
	// tokenString, err := token.SignedString(jwtSigninKey)

	// fmt.Println(tokenString, err)

	// parsedToken, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
	// 	return []byte("super-secret-key"), nil
	// })

	// if parsedToken.Valid {
	// 	log.Println(token.Claims)

	// 	log.Fatal("valid")
	// }
}
