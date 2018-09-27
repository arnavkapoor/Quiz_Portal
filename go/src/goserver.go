package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Question struct {
	ID            uint   `json:"id"`
	Category_Id   string `json:"category_id"`
	Difficulty_Id string `json:"difficulty_id"`
	Question_Type string `json:"question_type"`
	Image         string `json:"image"`
	Audio         string `json:"audio"`
	Que           string `json:"question"`
	OptionA       string `json:"optiona"`
	OptionB       string `json:"optionb"`
	OptionC       string `json:"optionc"`
	OptionD       string `json:"optiond"`
	AnswerA       string `json:"answera"`
	AnswerB       string `json:"answerb"`
	AnswerC       string `json:"answerc"`
	AnswerD       string `json:"answerd"`
}

type Leaderboard struct {
	ID            uint   `json:"id"`
	Username      string `json:"username"`
	Category_Id   string `json:"category_id"`
	Difficulty_Id string `json:"difficulty_id"`
	Score         string `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Leaderboard{})

	r := gin.Default()
	r.GET("/people/", GetPeople) // Creating routes for each functionality
	r.GET("/questions/", GetQuestion)
	r.GET("/leaderboard/", GetLeaderboard)

	r.POST("/filterquestions/", FilterQuestion)
	r.POST("/leaderboardupdate/", UpdateLeaderboard)

	r.DELETE("/questions/:id", DeleteQuestion)

	r.POST("/delquiz", DeleteQuiz)
	r.POST("/register", Register)
	r.POST("/login", Login)
	r.POST("/addq", AddQuestion)

	r.GET("/people/:id", GetPerson)
	r.PUT("/people/:id", UpdatePerson)
	r.DELETE("/people/:id", DeletePerson)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	ans := db.Where("id = ?", id).First(&question).RecordNotFound()
	fmt.Println(ans)
	if ans == true {
		c.Header("access-control-allow-origin", "*")
		c.JSON(420, gin.H{"id #" + id: "deleted"})
	} else {
		db.Where("id = ?", id).Delete(&question)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{"id #" + id: "deleted"})
	}
}

func DeleteQuiz(c *gin.Context) {
	var eachquestion Question
	c.BindJSON(&eachquestion)
	mycat := eachquestion.Category_Id
	mydif := eachquestion.Difficulty_Id
	fmt.Println(mycat, mydif)
	ans := db.Where("category_id = ? AND difficulty_id = ?", mycat, mydif).First(&eachquestion).RecordNotFound()
	if ans == true {
		c.Header("access-control-allow-origin", "*")
		c.JSON(420, eachquestion)
	} else {
		db.Where("category_id = ? AND difficulty_id = ?", mycat, mydif).Delete(Question{})
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, eachquestion)
	}
}
func UpdatePerson(c *gin.Context) {
	var person Person
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&person)
	db.Save(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, person)
}

func Register(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	uname := person.Username
	ans := db.Where("username = ?", uname).First(&person).RecordNotFound()
	if ans == true {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(422, person)
	}
}

func AddQuestion(c *gin.Context) {
	var myquestion Question
	c.BindJSON(&myquestion)
	myq := myquestion.Que
	fmt.Println(myq)
	ans := db.Where("que = ?", myq).First(&myquestion).RecordNotFound()
	if ans == true {
		db.Create(&myquestion)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, myquestion)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(422, myquestion)
	}
}

func Login(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	uname := person.Username
	upass := person.Password

	ans := db.Where(&Person{Username: uname, Password: upass}).First(&person).RecordNotFound()

	if ans == true {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(422, person)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func GetPeople(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}

func GetQuestion(c *gin.Context) {
	var question []Question
	if err := db.Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}

func GetLeaderboard(c *gin.Context) {
	var mylb []Leaderboard
	if err := db.Order("score desc").Find(&mylb).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, mylb)
	}
}

func FilterQuestion(c *gin.Context) {
	var myquestion []Question
	var eachquestion Question
	c.BindJSON(&eachquestion)
	mycat := eachquestion.Category_Id
	mydif := eachquestion.Difficulty_Id
	if err := db.Where("category_id = ? AND difficulty_id = ?", mycat, mydif).Find(&myquestion).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, myquestion)
	}
}

func UpdateLeaderboard(c *gin.Context) {
	var mylb Leaderboard
	c.BindJSON(&mylb)
	db.Create(&mylb)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, mylb)
}
