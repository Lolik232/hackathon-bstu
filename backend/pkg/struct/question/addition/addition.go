package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// Addition - вопрос открытого типа с дополнением.
// Реализует интерефейс - Question.
type Addition struct {
	Id            uuid.UUID `json:"id"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body"`  // Сам вопрос
	CorrectAnswer string    `json:"correct_answer"` // Правильный ответ
	Estimation    int       `json:"estimation"`     // Баллы за вопрос
	Complexity    int       `json:"complexity"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline"`  // id дисциплины
	IdCompetence  int       `json:"id_competence"`  // id компетенции
}
