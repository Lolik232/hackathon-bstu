package config

import (
	_ "github.com/joho/godotenv/autoload"
)

type StorageCfg struct {
	Host        string `yaml:"host"`
	User        string `yaml:"user" env-default:"postgres"`
	Password    string `yaml:"password" env-default:"admin"`
	DBName      string `yaml:"db_name" env-default:"postgres"`
	SSLMode     string `yaml:"ssl_mode" env-default:"disable"`
	MaxAttempts int    `yaml:"max_attempts"`
}

func MustLoad() *StorageCfg {
	/*
		if err := godotenv.Load(); err != nil {
			log.Print("No .env file found")
		}

		configPath, _ := os.LookupEnv("CONFIG_PATH")
		if configPath == "" {
			log.Fatal("CONFIG_PATH is not set")
		}

		if _, err := os.Stat(configPath); os.IsNotExist(err) {
			log.Fatalf("config file does not exist: %s", configPath)
		}

		var cfg StorageCfg

		if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
			log.Fatalf("cannot read congig: %s", err)
		}
	*/
	// Ебанем харкодом тк env не читается
	// Влад, если читаешь это то попробуй пофиксить

	var cfg StorageCfg
	cfg.Host = "85.193.89.158"
	cfg.User = "gen_user"
	cfg.Password = "Wy5mu]K^-7S6ne"
	cfg.DBName = "default_db"
	cfg.SSLMode = "disable"
	cfg.MaxAttempts = 5

	return &cfg
}
