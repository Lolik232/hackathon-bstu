package discipline

import (
	"context"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
)

type Repository interface {
	Create(ctx context.Context, p *Discipline) error
	FindAll(ctx context.Context) (p []Discipline, err error)
	FindOne(ctx context.Context, id int) (Discipline, error)
	Update(ctx context.Context, p Discipline) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, p *Discipline) error {
	q := `INSERT INTO discipline (name) VALUES ($1) RETURNING id`

	if err := r.client.QueryRow(ctx, q, p.Name).Scan(&p.Name); err != nil {
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

func (r repository) FindAll(ctx context.Context) (p []Discipline, err error) {
	q := `SELECT id,name FROM discipline`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	disciplines := make([]Discipline, 0)
	for rows.Next() {
		var d Discipline

		err := rows.Scan(&d.Id, &d.Name)
		if err != nil {
			return nil, err
		}

		disciplines = append(disciplines, d)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return disciplines, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Discipline, error) {
	q := `SELECT id, name FROM discipline WHERE id = $1`

	var d Discipline
	err := r.client.QueryRow(ctx, q, id).Scan(&d.Id, &d.Name)
	if err != nil {
		return Discipline{}, nil
	}
	return d, nil
}

func (r repository) Update(ctx context.Context, p Discipline) error {
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
