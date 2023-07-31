package question

// Question - интерфейс для работы с БД и загулшки для тестирования
type IQuestion interface {
	AddToDB(q *IQuestion)
	JSON2Question(jsonStr []byte, qStruct IQuestion)
	GetDB(id int) IQuestion
}
