package handler

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const HeaderAuthKey = "Authorization"
const UserIDContextKey = "UserID"

var ErrUnathorized = errors.New("Unauthorized")

type TokenValidator interface {
	GetUserIDFromToken(ctx context.Context, token string) (string, error)
}

func GinAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("auth")

		token := c.Request.Header.Get(HeaderAuthKey)

		if len(token) == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, "")
			return
		}

		parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte("super-secret-key"), nil
		})

		if err != nil && !errors.Is(err, jwt.ErrTokenInvalidClaims) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, "")
			return
		}

		// TODO: validate token

		userId, _ := parsedToken.Claims.GetSubject()

		// TODO: replace
		c.AddParam(UserIDContextKey, userId)
		c.Next()
	}
}
