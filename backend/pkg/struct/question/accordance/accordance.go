package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// Accordance - вопрос закрытого типа с установлением соответсвия.
// Реализует интерефейс - Question.
type Accordance struct {
	Id            uuid.UUID `json:"id"`             // id для хранения в бд
	QuestionBody  string    `json:"question_body"`  // Сам вопрос
	RightColumn   []string  `json:"right_column"`   // Варианты к которым нужно установить соответсивее
	Answers       []string  `json:"answers"`        // Варианты ответов
	CorrectAnswer []string  `json:"correct_answer"` // Правельный порядок ответов
	Estimation    int       `json:"estimation"`     // Баллы за вопрос
	Complexity    int       `json:"complexity"`     // Сложность вопроса
	IdDiscipline  int       `json:"id_discipline"`  // id дисциплины
	IdCompetence  int       `json:"id_competence"`  // id компетенции
}
