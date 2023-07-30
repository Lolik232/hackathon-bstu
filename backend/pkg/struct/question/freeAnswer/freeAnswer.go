package question

import uuid "github.com/jackc/pgx/pgtype/ext/gofrs-uuid"

// FreeAnswer - вопрос открытого типа, предполагают свободные ответы в соответствии с заданием.
// Реализует интерефейс - Question.
type FreeAnswer struct {
	Id           uuid.UUID `json:"id"`            // id для хранения в бд
	QuestionBody string    `json:"question_body"` // Сам вопрос
	Estimation   int       `json:"estimation"`    // Баллы за вопрос
	Complexity   int       `json:"complexity"`    // Сложность вопроса
	IdDiscipline int       `json:"id_discipline"` // id дисциплины
	IdCompetence int       `json:"id_competence"` // id компетенции
}
