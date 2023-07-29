package question

// Sequencing - вопрос закрытого типа с установление последовательности.
// Реализует интерефейс - Question.
type Sequencing struct {
	Id            string   // id для хранения в бд
	QuestionBody  string   // Сам вопрос
	Answers       []string // Варианты ответов
	CorrectAnswer []int    // Правельный порядок ответов
	Estimation    int      // Баллы за вопрос
	Complexity    int      // Сложность вопроса
}
