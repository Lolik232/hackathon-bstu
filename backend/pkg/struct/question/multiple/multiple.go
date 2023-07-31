package multiple

// Multiple - вопрос закрытого типа с одиночным выбором.
// Реализует интерефейс - Question.
type Multiple struct {
	Id             int      `json:"id"`              // id для хранения в бд
	QuestionBody   string   `json:"question_body"`   // Сам вопрос
	Explanation    string   `json:"explanation"`     // Пояснение вопроса
	Answers        []string `json:"answers"`         // Варианты ответов
	CorrectAnswers []int    `json:"correct_answers"` // Правильные ответы, места в Answers[]
	Estimation     int      `json:"estimation"`      // Баллы за вопрос
	Complexity     int      `json:"complexity"`      // Сложность вопроса
	IdDiscipline   int      `json:"id_discipline"`   // id дисциплины
	IdCompetence   int      `json:"id_competence"`   // id компетенции
}

func NewMultiple(questionBody string, explanation string, answers []string, correctAnswer []int, estimation int, complexity int, idDiscipline int, idCompetence int) *Multiple {
	return &Multiple{QuestionBody: questionBody, Explanation: explanation, Answers: answers, CorrectAnswers: correctAnswer, Estimation: estimation, Complexity: complexity, IdDiscipline: idDiscipline, IdCompetence: idCompetence}
}
