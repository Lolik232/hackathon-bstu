package sinlge

// Single - вопрос закрытого типа  с одиночным выбором.
// Реализует интерефейс - IQuestion.
type Single struct {
	Id            int      `json:"id"`             // id для хранения в бд
	QuestionBody  string   `json:"question_body"`  // Сам вопрос
	Answers       []string `json:"answers"`        // Варианты ответов
	CorrectAnswer int      `json:"correct_answer"` // Правильный ответ, место в Answers[]
	Estimation    int      `json:"estimation"`     // Баллы за вопрос
	Complexity    int      `json:"complexity"`     // Сложность вопроса
	IdDiscipline  int      `json:"id_discipline"`  // id дисциплины
	IdCompetence  int      `json:"id_competence"`  // id компетенции
}
