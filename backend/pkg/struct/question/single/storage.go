package sinlge

import (
	"context"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
)

type Repository interface {
	Create(ctx context.Context, s *Single) error
	FindAll(ctx context.Context) (p []Single, err error)
	FindOne(ctx context.Context, id int) (Single, error)
	Update(ctx context.Context, p Single) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, s *Single) error {
	q := `INSERT INTO single (body, answers, correct_ans, estimation, eomplexity,id_discipline,id_competence)
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`

	if err := r.client.QueryRow(
		ctx, q, s.QuestionBody, s.Answers, s.CorrectAnswer, s.Estimation, s.Complexity, s.IdDiscipline, s.IdCompetence).
		Scan(&s.Id); err != nil {
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

func (r repository) FindAll(ctx context.Context) (c []Single, err error) {
	q := `select id,body, answers, correct_ans, estimation, eomplexity,id_discipline,id_competence FROM competence`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	singles := make([]Single, 0)
	for rows.Next() {
		var s Single

		err := rows.Scan(&s.Id, &s.Answers, &s.CorrectAnswer, &s.Estimation, &s.Complexity, &s.IdDiscipline, &s.IdCompetence)
		if err != nil {
			return nil, err
		}

		singles = append(singles, s)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return singles, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Single, error) {
	q := `select id,body, answers, correct_ans, estimation, eomplexity,id_discipline,id_competence FROM competence WHERE id = $1`

	var s Single
	err := r.client.QueryRow(ctx, q, id).Scan(&s.Id, &s.Answers, &s.CorrectAnswer, &s.Estimation, &s.Complexity, &s.IdDiscipline, &s.IdCompetence)
	if err != nil {
		return Single{}, nil
	}
	return s, nil
}

func (r repository) Update(ctx context.Context, c Single) error {
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
