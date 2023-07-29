package question

// Multiple - вопрос закрытого типа с одиночным выбором.
// Реализует интерефейс - Question.
type Multiple struct {
	Id             string   // id для хранения в бд
	QuestionBody   string   // Сам вопрос
	Answers        []string // Варианты ответов
	CorrectAnswers []string // Правильные ответы, места в Answers[]
	Estimation     int      // Баллы за вопрос
	Complexity     int      // Сложность вопроса
}
