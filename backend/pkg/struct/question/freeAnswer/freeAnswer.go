package question

// FreeAnswer - вопрос открытого типа, предполагают свободные ответы в соответствии с заданием.
// Реализует интерефейс - Question.
type FreeAnswer struct {
	Id           string // id для хранения в бд
	QuestionBody string // Сам вопрос
	Estimation   int    // Баллы за вопрос
	Complexity   int    // Сложность вопроса
}
