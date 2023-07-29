package question

// Single - вопрос закрытого типа  с одиночным выбором.
// Реализует интерефейс - Question.
type Single struct {
	Id            string   // id для хранения в бд
	QuestionBody  string   // Сам вопрос
	Answers       []string // Варианты ответов
	CorrectAnswer int      // Правильный ответ, место в Answers[]
	Estimation    int      // Баллы за вопрос
	Complexity    int      // Сложность вопроса
}
