package competence

type ICompetence interface {
}

// Competence - ебучие компитенции со всеми их описаниями и кодами
type Competence struct {
	Id                      int    `json:"id"`                        // Наименование категории (группы) универсальных компетенций
	NameCategory            string `json:"name_category"`             // Наименование категории компетенций (краткое описание)
	CompetencyCode          string `json:"competency_code"`           // Код компетенции - УК-x УК-y и тп
	NameUniversalCompetence string `json:"name_universal_competence"` // Наименование универсальной компетенции (душное описание)
	IndicatorCode           string `json:"indicator_code"`            // Код компетенции - УК-x.1 УК-x.2 и тп
	IndicatorName           string `json:"indicator_name"`            // Наименование индикатора (душное описание №2)
}
