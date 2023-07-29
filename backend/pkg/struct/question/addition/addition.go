package question

// Addition - вопрос открытого типа с дополнением.
// Реализует интерефейс - Question.
type Addition struct {
	Id            string // id для хранения в бд
	QuestionBody  string // Сам вопрос
	CorrectAnswer string // Правильный ответ
	Estimation    int    // Баллы за вопрос
	Complexity    int    // Сложность вопроса
}
