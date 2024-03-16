package main

import (
	"fmt"
	"html/template"
	"io"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Template struct {
	tmpl *template.Template
}

func newTemplate() *Template {
	return &Template{
		tmpl: template.Must(template.ParseGlob("templates/*.html")),
	}
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.tmpl.ExecuteTemplate(w, name, data)
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("error loading godotenv")
	}

	db, err := gorm.Open(sqlite.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&User{})

	// Create
	db.Create(&User{
		Name: "Damien Sedgwick", Email: "damienksedgwick@gmail.com", Password: "password"})

	// Read
	var user User
	db.First(&user, 1)

	e := echo.New()

	e.Static("/static", "static")
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())

	e.Renderer = newTemplate()

	e.GET("/", func(c echo.Context) error {
		return c.Render(200, "index", newPageData(user))
	})

	e.Logger.Fatal(e.Start(":8080"))
}

type PageData struct {
	User User
}

func newPageData(user User) PageData {
	return PageData{
		User: user,
	}
}

type User struct {
	gorm.Model
	Name     string
	Email    string
	Password string
}
