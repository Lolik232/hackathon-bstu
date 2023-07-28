package config

type StorageCfg struct {
	Host        string `yaml:"host"`
	User        string `yaml:"user" env-default:"postgres"`
	Password    string `yaml:"password" env-default:"admin"`
	DBName      string `yaml:"db_name" env-default:"postgres"`
	SSLMode     string `yaml:"ssl_mode" env-default:"disable"`
	MaxAttempts int    `yaml:"max_attempts"`
}
