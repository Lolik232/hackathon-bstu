package question

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/pkg/struct/question"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
	"log"
)

type Repository interface {
	Create(ctx context.Context, s *Addition) error
	FindAll(ctx context.Context) (p []Addition, err error)
	FindOne(ctx context.Context, id int) (Addition, error)
	Update(ctx context.Context, p Addition) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, s *Addition) error {
	q := `INSERT INTO sequencing (id, body, explanation, correct_answer, estimation, complexity, id_discipline, id_competence)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`

	if err := r.client.QueryRow(
		ctx, q, s.Id, s.QuestionBody, s.Explanation, s.CorrectAnswer, s.Estimation, s.Complexity, s.IdDiscipline, s.IdCompetence).
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

func (r repository) FindAll(ctx context.Context) (c []Addition, err error) {
	q := `SELECT id, body, explanation, correct_answer, estimation, complexity, id_discipline, id_competence FROM single`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	additions, err := pgx.CollectRows(rows, pgx.RowToStructByName[Addition])
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return additions, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Addition, error) {
	q := `SELECT id, body, explanation, correct_answer, estimation, complexity, id_discipline, id_competence FROM single WHERE id = $1`

	row, _ := r.client.Query(ctx, q, id)
	a, err := pgx.CollectOneRow(row, pgx.RowToStructByName[Addition])
	if err != nil {
		log.Fatal(err)
		return Addition{}, nil
	}

	return a, nil
}

func (r repository) Update(ctx context.Context, c Addition) error {
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

func (q Addition) AddToDB(s *question.IQuestion) {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := NewRepository(pgSQLClient, &logger)
	err = repository.Create(context.Background(), &q)
	if err != nil {
		logger.Info("Error")
	}
}

func (q Addition) JSON2Question(jsonStr []byte, sq question.IQuestion) {
	err := json.Unmarshal(jsonStr, &sq)
	if err != nil {
		log.Fatal("не удалось преобразовать JSON в Single")
	}
}
