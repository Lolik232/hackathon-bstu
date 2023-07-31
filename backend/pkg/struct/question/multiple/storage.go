package multiple

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
	Create(ctx context.Context, s *Multiple) error
	FindAll(ctx context.Context) (p []Multiple, err error)
	FindOne(ctx context.Context, id int) (Multiple, error)
	Update(ctx context.Context, p Multiple) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, s *Multiple) error {
	q := `INSERT INTO single (body,explanation, answers, correct_ans,estimation, complexity, id_discipline, id_competence)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`

	if err := r.client.QueryRow(
		ctx, q, s.QuestionBody, s.Answers, s.CorrectAnswers, s.Estimation, s.Complexity, s.IdDiscipline, s.IdCompetence).
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

func (r repository) FindAll(ctx context.Context) (c []Multiple, err error) {
	q := `SELECT id,body,explanation, answers, correct_answers, estimation, complexity,id_discipline,id_competence FROM Multiple`

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	singles := make([]Multiple, 0)
	for rows.Next() {
		var m Multiple

		err := rows.Scan(&m.Id, &m.QuestionBody, &m.Explanation, &m.Answers, &m.CorrectAnswers, &m.Estimation, &m.Complexity, &m.IdDiscipline, &m.IdCompetence)
		if err != nil {
			return nil, err
		}

		singles = append(singles, m)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return singles, nil
}

func (r repository) FindOne(ctx context.Context, id int) (Multiple, error) {
	q := `SELECT id, body, explanation, answers, correct_answers,estimation, complexity, id_discipline, id_competence FROM single WHERE id = $1`

	var m Multiple
	err := r.client.QueryRow(ctx, q, id).Scan(&m.Id, &m.QuestionBody, &m.Answers, &m.CorrectAnswers, &m.Estimation, &m.Complexity, &m.IdDiscipline, &m.IdCompetence)
	if err != nil {
		log.Fatal(err)
		return Multiple{}, nil
	}
	return m, nil
}

func (r repository) Update(ctx context.Context, c Multiple) error {
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

func (q Multiple) AddToDB(s *question.IQuestion) {
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

func (q Multiple) JSON2Question(jsonStr []byte, sq question.IQuestion) {
	err := json.Unmarshal(jsonStr, &sq)
	if err != nil {
		log.Fatal("не удалось преобразовать JSON в Single")
	}
}

// GetDB - получить вопрос из бд по его id
func (q Multiple) GetDB(id int) question.IQuestion {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := NewRepository(pgSQLClient, &logger)
	s, err := repository.FindOne(context.TODO(), id)
	if err != nil {
		logger.Info("Error")
	}

	return s
}
