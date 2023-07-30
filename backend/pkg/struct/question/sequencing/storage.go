package question

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/pkg/struct/question"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
	"log"
)

type Repository interface {
	Create(ctx context.Context, s *Sequencing) error
	FindAll(ctx context.Context) (p []Sequencing, err error)
	FindOne(ctx context.Context, id int) (Sequencing, error)
	Update(ctx context.Context, p Sequencing) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, s *Sequencing) error {
	q := `INSERT INTO sequencing (body, explanation, answers, correct_answer,incorrect_answer,estimation, complexity, id_discipline, id_competence)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`

	if err := r.client.QueryRow(
		ctx, q, s.QuestionBody, s.Explanation, s.Answers, s.CorrectAnswer, s.IncorrectAnswers, s.Estimation, s.Complexity, s.IdDiscipline, s.IdCompetence).
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

func (r repository) FindAll(ctx context.Context) (c []Sequencing, err error) {
	q := `SELECT id, body, explanation, answers, correct_answer,incorrect_answer,estimation, complexity, id_discipline, id_competence FROM single`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	sequencing := make([]Sequencing, 0)
	for rows.Next() {
		var s Sequencing

		err := rows.Scan(&s.Id, &s.QuestionBody, &s.Explanation, &s.Answers, &s.IncorrectAnswers, &s.CorrectAnswer, &s.Estimation, &s.Complexity, &s.IdDiscipline, &s.IdCompetence)
		if err != nil {
			return nil, err
		}

		sequencing = append(sequencing, s)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return sequencing, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Sequencing, error) {
	q := `SELECT id, body, explanation, answers, correct_answer,incorrect_answer,estimation, complexity, id_discipline, id_competence FROM single WHERE id = $1`

	var s Sequencing
	err := r.client.QueryRow(ctx, q, id).Scan(&s.Id, &s.Explanation, &s.QuestionBody, &s.Answers, &s.CorrectAnswer, &s.IncorrectAnswers, &s.Estimation, &s.Complexity, &s.IdDiscipline, &s.IdCompetence)
	if err != nil {
		log.Fatal(err)
		return Sequencing{}, nil
	}
	return s, nil
}

func (r repository) Update(ctx context.Context, c Sequencing) error {
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

func (q Sequencing) AddToDB(s *question.IQuestion) {
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

func (q Sequencing) JSON2Question(jsonStr []byte, sq question.IQuestion) {
	err := json.Unmarshal(jsonStr, &sq)
	if err != nil {
		log.Fatal("не удалось преобразовать JSON в Single")
	}
}
