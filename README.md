
*Coded by:* **Arnav Kapoor**

This is a Go server that implements REST API and interacts with the database at the backend. The front end is a React application that is an interactive quiz. This was SSAD Assignment 2.

## Functionality
1. Admin privileges to one user along with admin panel
    Admin can:
    - View/Create/Delete quizzes
    - Create/Delete questions in each quiz
    - View all users
    - Delete users
2. Registration and login for users
3. Multiple genre of quizzes
4. At least two different types of questions
5. Global Leaderboard across genre and Your past scores
6. Questions may contain images and audio
## Packages used for go
> - fmt
> - github.com/gin-contrib/cors
> - github.com/gin-gonic/gin
> - github.com/jinzhu/gorm
> - github.com/jinzhu/gorm/dialects/sqlite

## Getting Started
Directory/:

    ---go/

    ---react-app/

    ---README.md

In one terminal:
```
cd ./go/src
go run goserver.go
```

In another terminal:
```
cd ./react-app
yarn start
```