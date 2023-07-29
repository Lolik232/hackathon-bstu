package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// Single - вопрос закрытого типа  с одиночным выбором.
// Реализует интерефейс - IQuestion.
type Single struct {
	Id            uuid.UUID `json:"id,omitempty"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body,omitempty"`  // Сам вопрос
	Answers       []string  `json:"answers,omitempty"`        // Варианты ответов
	CorrectAnswer int       `json:"correct_answer,omitempty"` // Правильный ответ, место в Answers[]
	Estimation    int       `json:"estimation,omitempty"`     // Баллы за вопрос
	Complexity    int       `json:"complexity,omitempty"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline,omitempty"`  // id дисциплины
	IdCompetence  int       `json:"id_competence,omitempty"`  // id компетенции
}
