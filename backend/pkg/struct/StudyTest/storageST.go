package StudyTest

import (
	"context"
	"fmt"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/exp/slog"
)

type Repository interface {
	Create(ctx context.Context, s *StudyTest) error
	FindAll(ctx context.Context) (p []StudyTest, err error)
	FindOne(ctx context.Context, id int) (StudyTest, error)
	Update(ctx context.Context, p StudyTest) error
	Delete(ctx context.Context, id int) error
}

type repository struct {
	client pgSQL.Client
	logger *slog.Logger
}

func (r repository) Create(ctx context.Context, st *StudyTest) error {
	q := `INSERT INTO study_test (id, id_competence, id_question, ans_type) VALUES ($1,$2,$3,$4) RETURNING id`

	if err := r.client.QueryRow(
		ctx, q, st.Id, st.IdCompetence, st.IdQuestion, st.AnsType).Scan(&st.Id); err != nil {
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

func (r repository) FindAll(ctx context.Context) (p []StudyTest, err error) {
	//TODO implement me
	panic("implement me")
}

func (r repository) FindOne(ctx context.Context, id int) (StudyTest, error) {
	q := `SELECT id, id_competence, id_question, ans_type FROM study_test WHERE id = $1`

	var st StudyTest
	err := r.client.QueryRow(ctx, q, id).Scan(&st.Id, &st.IdCompetence, &st.IdQuestion, &st.AnsType)
	if err != nil {
		return StudyTest{}, nil
	}

	return st, nil
}

func (r repository) Update(ctx context.Context, p StudyTest) error {
	//TODO implement me
	panic("implement me")
}

func (r repository) Delete(ctx context.Context, id int) error {
	//TODO implement me
	panic("implement me")
}

func NewRepository(client pgSQL.Client, logger *slog.Logger) Repository {
	return &repository{client: client, logger: logger}
}

// GetDB - получить вопрос из бд по его id
func (q StudyTest) GetDB(id int) StudyTest {
	logger := slog.Logger{}
	pgSQLClient, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		slog.Warn(err.Error())
	}

	repository := NewRepository(pgSQLClient, &logger)
	st, err := repository.FindOne(context.TODO(), id)
	if err != nil {
		logger.Info("Error")
	}

	return st
}
