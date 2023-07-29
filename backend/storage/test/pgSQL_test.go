package pgSQL

import (
	"context"
	"github.com/Lolik232/hackathon-bstu/config"
	"github.com/Lolik232/hackathon-bstu/storage/pgSQL"
	"testing"
)

func TestNewClient(t *testing.T) {
	_, err := pgSQL.NewClient(context.TODO())
	if err != nil {
		t.Error()
	}
}

func TestMustLoadCfg(t *testing.T) {
	load := config.MustLoad()
	if load == nil {
		t.Error()
	}
}
