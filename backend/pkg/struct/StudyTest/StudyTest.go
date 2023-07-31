package StudyTest

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/pkg/struct/question/multiple"
	question "github.com/Lolik232/hackathon-bstu/pkg/struct/question/single"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"golang.org/x/exp/slog"
	"math/rand"
)

// StudyTest - хранение теста в бд для отправки на тестирование
type StudyTest struct {
	Id           int   `json:"id"`            // id теста бд потом в uuid переделать
	IdCompetence int   `json:"id_competence"` // id компетенции для сортировки по ней
	IdQuestion   []int `json:"id_question"`   // id вопросов бд потом в uuid переделать
	AnsType      []int `json:"ans_type"`      // типы вопросов
}

func (st StudyTest) Print() {
	fmt.Printf("id теста в БД: %d \n", st.Id)
	fmt.Printf("компетенция: %d\n", st.IdCompetence)
	fmt.Println("Массив id вопросов в бд: \n", st.IdQuestion)
	fmt.Println("Массив типов вопросов: \n", st.AnsType)
}

func AddToDB(st StudyTest) {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := NewRepository(pgSQLClient, &logger)
	err = repository.Create(context.Background(), &st)
	if err != nil {
		logger.Info("Error")
	}
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
		var qs question.Single
		qqs := qs.GetDB(id)
		q, _ := json.Marshal(qqs)
		return q
	case qMultiple:
		fmt.Printf("вернет из БД вопрос с id: %d типа: %d \n", id, qMultiple)
		var qs multiple.Multiple
		qqs := qs.GetDB(id)
		q, _ := json.Marshal(qqs)
		return q
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

func (st *StudyTest) CrateStudyTest() {
	st.Id = rand.Int()  // заглушка
	st.IdCompetence = 1 // заглушка
	st.IdQuestion = GetIdQuestion(FindAllSinglesFromDB())
	st.AnsType = []int{0, 0, 0} // заглушка
}
