package handler

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

const HeaderAuthKey = "Authorization"

const UserIDContextKey = "UserID"

type TokenValidator interface {
	GetUserIDFromToken(ctx context.Context, token string) (string, error)
}

func GinAuthMiddleware(validator TokenValidator) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get(HeaderAuthKey)

		if len(token) == 0 {
			c.AbortWithError(http.StatusUnauthorized, errors.New("Unauthorized"))
		}

		id, err := validator.GetUserIDFromToken(c.Request.Context(), token)

		if err != nil {
			c.AbortWithError(http.StatusUnauthorized, errors.New("Unauthorized"))
		}

		// TODO: replace
		c.AddParam(UserIDContextKey, id)
	}
}
