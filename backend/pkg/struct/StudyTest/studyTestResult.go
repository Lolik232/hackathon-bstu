package StudyTest

// StudyTestResult - получение результата тестирования
type StudyTestResult struct {
	Id         int      `json:"id"`          // id теста бд
	IdUser     int      `json:"id_user"`     // id студента который прошел тест
	IdQuestion []int    `json:"id_question"` // id вопросов бд
	AnsType    []int    `json:"ans_type"`    // типы вопросов
	Answers    []string `json:"answers"`     // ответы студента на вопросы
}
