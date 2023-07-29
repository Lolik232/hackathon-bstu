package question

// Multiple - вопрос закрытого типа с одиночным выбором.
// Реализует интерефейс - Question.
type Multiple struct {
	Id             string   `json:"id,omitempty"`              // id для хранения в бд
	QuestionBody   string   `json:"question_body,omitempty"`   // Сам вопрос
	Answers        []string `json:"answers,omitempty"`         // Варианты ответов
	CorrectAnswers []string `json:"correct_answers,omitempty"` // Правильные ответы, места в Answers[]
	Estimation     int      `json:"estimation,omitempty"`      // Баллы за вопрос
	Complexity     int      `json:"complexity,omitempty"`      // Сложность вопроса
	IdDiscipline   int      `json:"id_discipline,omitempty"`   // id дисциплины
	IdCompetence   int      `json:"id_competence,omitempty"`   // id компетенции
}
