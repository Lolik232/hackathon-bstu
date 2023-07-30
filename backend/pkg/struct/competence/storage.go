package competence

import (
	"context"
	"fmt"

	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
)

type Repository interface {
	Create(ctx context.Context, p *Competence) error
	FindAll(ctx context.Context) (p []Competence, err error)
	FindOne(ctx context.Context, id int) (Competence, error)
	Update(ctx context.Context, p Competence) error
	Delete(ctx context.Context, id int) error
}

// лучше вынести реализацию репозитория в отдельный пакет с конкретной реализацией
// например, в папке competence создать папку storage,
// а в ней подпапки с пакетами конкретной реализации
// competence/postgres competence/mongo и т.д.
type repository struct {
	client pgSQL.Client
	logger *slog.Logger // слог это хорошо
}

func (r repository) Create(ctx context.Context, c *Competence) error {
	q := `INSERT INTO competence (name_сategory, competency_code, name_competence, indicator_code, indicator_name) 
			VALUES ($1,$2,$3,$4,$5) RETURNING id`

	if err := r.client.QueryRow(ctx, q, c.NameCategory, c.CompetencyCode, c.NameUniversalCompetence, c.IndicatorCode, c.IndicatorName).Scan(&c.Id); err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			newErr := fmt.Errorf(fmt.Sprintf("SQL Error: %s\n Detail: %s\n Where: %s\n Code: %s\n SQLState: %s\n",
				pgErr.Message, pgErr.Detail, pgErr.Where, pgErr.Code, pgErr.SQLState()))

			r.logger.Info(newErr.Error())
			return newErr
		}
		return err
	}
	return nil
}

func (r repository) FindAll(ctx context.Context) (c []Competence, err error) {
	q := `select id, name_сategory, competency_code, name_competence, indicator_code, indicator_name FROM competence`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	disciplines, err := pgx.CollectRows(rows, pgx.RowToStructByName[Competence])

	if err != nil {
		return nil, err
	}

	return disciplines, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Competence, error) {
	q := `SELECT id,name_сategory, competency_code, name_competence, indicator_code, indicator_name FROM competence WHERE id = $1`

	/*
		var c Competence
		err := r.client.QueryRow(ctx, q, id).Scan(&c.Id, &c.NameCategory, &c.CompetencyCode, &c.NameUniversalCompetence, &c.IndicatorCode, &c.IndicatorName)
	*/

	row, _ := r.client.Query(ctx, q, id)
	c, err := pgx.CollectOneRow(row, pgx.RowToStructByName[Competence])

	if err != nil {
		return Competence{}, nil
	}

	return c, nil
}

func (r repository) Update(ctx context.Context, c Competence) error {
	//TODO implement me
	panic("implement me")
}

func (r repository) Delete(ctx context.Context, id int) error {
	q := `DELETE FROM discipline WHERE id = $1`
	fmt.Println(q)
	panic("implement me")
}

func NewRepository(client pgSQL.Client, logger *slog.Logger) Repository {
	return &repository{client: client, logger: logger}
}
