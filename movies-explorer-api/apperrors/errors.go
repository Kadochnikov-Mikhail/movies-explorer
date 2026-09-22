package apperrors

import "errors"

var (
	ErrBadRequest   = errors.New("некорректный запрос")
	ErrUnauthorized = errors.New("неправильные почта или пароль")
	ErrForbidden    = errors.New("попытка удалить чужой фильм")
	ErrConflict     = errors.New("пользователь с таким email уже существует")
	ErrNotFound     = errors.New("Страница по указанному маршруту не найдена.")
)
