package pgSQL

import (
	"context"
	"github.com/Lolik232/hackathon-bstu/config"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

type Client interface {
	Exec(ctx context.Context, sql string, arg ...interface{}) (pgconn.CommandTag, error)
	Query(ctx context.Context, sql string, args ...interface{}) (pgx.Rows, error)
	QueryRow(ctx context.Context, sql string, args ...interface{}) pgx.Row
	Begin(ctx context.Context) (pgx.Tx, error)
}

func GetConnectionStrDB(cfg *config.StorageCfg) string {
	connStr := "host=" + cfg.Host + " user=" + cfg.User + " password=" + cfg.Password + " dbname=" + cfg.DBName + " sslmode=" + cfg.SSLMode
	return connStr
}

// Возвращает новое подключение к базе данных,
// error - в случае неудачного подлючения
func NewClient(ctx context.Context) (*pgx.Conn, error) {
	cfg := config.MustLoad()
	connStr := GetConnectionStrDB(cfg)

	var connection *pgx.Conn = nil
	var err error = nil
	for i := 0; i < cfg.MaxAttempts; i++ {
		connection, err = pgx.Connect(context.Background(), connStr)
		if err == nil {
			break
		}
	}

	return connection, err
}
