package converter

import (
	question2 "github.com/Lolik232/hackathon-bstu/pkg/struct/question"
	question "github.com/Lolik232/hackathon-bstu/pkg/struct/question/single"
)

const (
	qSingle     = iota // 0 одиночынй выбор
	qMultiple   = iota // 1 множественный выбор
	qSequencing = iota // 2 установление последовательности
	qAccordance = iota // 3 установление соответсвия
	qAddition   = iota // 4 с дополнением
	qFreeAnswer = iota // 5 свободный ответ
)

// конвертирует json в структуру вопроса
func JSONToQuestion(jsonStr []byte, t int) question2.IQuestion {
	var q question2.IQuestion
	switch t {
	case qSingle:
		var sq question.Single
		sq.JSON2Question(jsonStr, &sq)
		q = sq
		return q
	case qMultiple:
	case qSequencing:
	case qAccordance:
	case qAddition:
	case qFreeAnswer:
	}

	return nil
}
