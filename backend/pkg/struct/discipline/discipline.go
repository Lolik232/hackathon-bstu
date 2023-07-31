package discipline

type IDiscipline interface {
}

type Discipline struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}
