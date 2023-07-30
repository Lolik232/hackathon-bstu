package question

import "github.com/google/uuid"

// Addition - вопрос открытого типа с дополнением.
// Реализует интерефейс - Question.
type Addition struct {
	Id            uuid.UUID `json:"id"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body"`  // Сам вопрос
	Explanation   string    `json:"explanation"`    // Пояснение вопроса
	CorrectAnswer string    `json:"correct_answer"` // Правильный ответ
	Estimation    int       `json:"estimation"`     // Баллы за вопрос
	Complexity    int       `json:"complexity"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline"`  // id дисциплины
	IdCompetence  int       `json:"id_competence"`  // id компетенции
}

func NewAddition(id uuid.UUID, questionBody string, explanation string, correctAnswer string, estimation int, complexity int, idDiscipline int, idCompetence int) *Addition {
	return &Addition{Id: id, QuestionBody: questionBody, Explanation: explanation, CorrectAnswer: correctAnswer, Estimation: estimation, Complexity: complexity, IdDiscipline: idDiscipline, IdCompetence: idCompetence}
}
