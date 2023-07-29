package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// Addition - вопрос открытого типа с дополнением.
// Реализует интерефейс - Question.
type Addition struct {
	Id            uuid.UUID `json:"id,omitempty"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body,omitempty"`  // Сам вопрос
	CorrectAnswer string    `json:"correct_answer,omitempty"` // Правильный ответ
	Estimation    int       `json:"estimation,omitempty"`     // Баллы за вопрос
	Complexity    int       `json:"complexity,omitempty"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline,omitempty"`  // id дисциплины
	IdCompetence  int       `json:"id_competence,omitempty"`  // id компетенции
}
