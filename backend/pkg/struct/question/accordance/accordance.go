package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// Accordance - вопрос закрытого типа с установлением соответсвия.
// Реализует интерефейс - Question.
type Accordance struct {
	Id            uuid.UUID `json:"id,omitempty"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body,omitempty"`  // Сам вопрос
	RightColumn   []string  `json:"right_column,omitempty"`   // Варианты к которым нужно установить соответсивее
	Answers       []string  `json:"answers,omitempty"`        // Варианты ответов
	CorrectAnswer []string  `json:"correct_answer,omitempty"` // Правельный порядок ответов
	Estimation    int       `json:"estimation,omitempty"`     // Баллы за вопрос
	Complexity    int       `json:"complexity,omitempty"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline,omitempty"`  // id дисциплины
	IdCompetence  int       `json:"id_competence,omitempty"`  // id компетенции
}
