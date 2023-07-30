package question

// Question - интерфейс для работы с БД и загулшки для тестирования
type IQuestion interface {
	// TODO create func
	AddToDB(q *IQuestion)
	JSON2Question(jsonStr []byte, qStruct IQuestion)
}
