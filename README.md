# Movies Explorer

Веб-приложение для поиска фильмов и сохранения понравившихся фильмов в личную коллекцию.

Проект создан в рамках обучения веб-разработке и доработан для портфолио.

## Стек

### Frontend

- React
- React Router
- JavaScript
- CSS
- REST API

### Backend

- Go
- Fiber
- MongoDB
- JWT
- bcrypt

## Возможности

- регистрация и авторизация;
- поиск фильмов;
- фильтрация фильмов по длительности;
- сохранение фильмов в личную коллекцию;
- удаление сохранённых фильмов;
- редактирование данных профиля.

## Backend

Изначально backend проекта был реализован на Express.js + MongoDB.

Позже backend был переписан на Go + Fiber, чтобы применить на практике:

- построение REST API;
- HTTP middleware;
- JWT-аутентификацию;
- работу с MongoDB;
- разделение приложения на handlers, services и repositories;
- валидацию данных;
- обработку ошибок.

В репозитории находится текущая версия backend на Go.

## Структура проекта

movies-explorer/
├── movies-explorer-frontend/
└── movies-explorer-api/

## Запуск проекта

### Frontend

cd movies-explorer-frontend
npm install
npm start

Frontend запускается на:

http://localhost:3001

### Backend

Создайте файл `.env` в директории `movies-explorer-api`:

PORT=3000
DATABASE_URL=mongodb://localhost:27017/moviesdb
JWT_SECRET=secret-key
NODE_ENV=development

Запустите MongoDB и backend:

cd movies-explorer-api
go run .

Backend запускается на:

http://localhost:3000

## Автор

Михаил Кадочников

GitHub: https://github.com/Kadochnikov-Mikhail
