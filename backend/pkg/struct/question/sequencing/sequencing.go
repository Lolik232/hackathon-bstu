package question

// Sequencing - вопрос закрытого типа с установление последовательности.
// Реализует интерефейс - Question.
type Sequencing struct {
	Id           int    `json:"id,omitempty"`  // id для хранения в бд
	QuestionBody string `json:"question_body"` // Сам вопрос
	Explanation  string `json:"explanation"`   // Пояснение вопроса

	// Правильная последовательность
	Answers       []string `json:"answers"`        // Варианты ответов
	CorrectAnswer []int    `json:"correct_answer"` // Правельный порядок ответов
	// Последовательность для теста
	IncorrectAnswers []int `json:"incorrect_answers"` // Порядок ответов для тест ввода в тест

	Estimation   int `json:"estimation"`    // Баллы за вопрос
	Complexity   int `json:"complexity"`    // Сложность вопроса
	IdDiscipline int `json:"id_discipline"` // id дисциплины
	IdCompetence int `json:"id_competence"` // id компетенции
}
