package question

// Accordance - вопрос закрытого типа с установлением соответсвия.
// Реализует интерефейс - Question.
type Accordance struct {
	Id            string   // id для хранения в бд
	QuestionBody  string   // Сам вопрос
	RightColumn   []string // Варианты к которым нужно установить соответсивее
	Answers       []string // Варианты ответов
	CorrectAnswer []string // Правельный порядок ответов
	Estimation    int      // Баллы за вопрос
	Complexity    int      // Сложность вопроса
}
