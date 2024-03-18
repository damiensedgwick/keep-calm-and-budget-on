package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Template struct {
	tmpl *template.Template
}

func newTemplate() *Template {
	return &Template{
		tmpl: template.Must(template.ParseGlob("template/*.html")),
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

	e := echo.New()

	e.Static("/static", "static")
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())

	store := sessions.NewCookieStore([]byte(os.Getenv("KEEP_CALM_AND_BUDGET_ON_COOKIE_STORE_SECRET")))
	e.Use(session.Middleware(store))

	e.Renderer = newTemplate()

	db, err := gorm.Open(sqlite.Open(os.Getenv("KEEP_CALM_AND_BUDGET_ON_DB_PATH")), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&User{})

	e.GET("/", func(c echo.Context) error {
		sess, _ := session.Get("session", c)

		if sess.Values["user"] != nil {
			var user User

			err := json.Unmarshal(sess.Values["user"].([]byte), &user)
			if err != nil {
				fmt.Println("error unmarshalling user value")
				return err
			}

			return c.Render(200, "index", newPageData(user))
		}

		return c.Render(200, "index", nil)
	})

	e.GET("/auth/sign-in", func(c echo.Context) error {
		return c.Render(200, "signin-form", nil)
	})

	e.GET("/auth/sign-up", func(c echo.Context) error {
		return c.Render(200, "signup-form", nil)
	})

	e.POST("/auth/sign-in", func(c echo.Context) error {
		email := c.FormValue("email")
		password := c.FormValue("password")

		// Read
		var user User
		db.First(&user, "email = ?", email)

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			return echo.ErrUnauthorized
		}

		sess, _ := session.Get("session", c)
		sess.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   86400 * 7,
			HttpOnly: true,
		}

		userBytes, err := json.Marshal(user)
		if err != nil {
			fmt.Println("error marshalling user value")
			return err
		}

		sess.Values["user"] = userBytes

		err = sess.Save(c.Request(), c.Response())
		if err != nil {
			fmt.Println("error saving session: ", err)
			return err
		}

		return c.Render(200, "index", newPageData(user))
	})

	e.POST("/auth/sign-up", func(c echo.Context) error {
		email := c.FormValue("email")
		name := c.FormValue("name")
		password := c.FormValue("password")

		hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
		if err != nil {
			fmt.Println("error hasing new password")
			return err
		}

		id := db.Create(&User{
			Model:     gorm.Model{},
			Name:      name,
			Email:     email,
			Password:  hash,
			CreatedAt: time.Now(),
			UpdatedAt: &time.Time{},
		})

		var user User
		db.First(&user, id)

		sess, _ := session.Get("session", c)
		sess.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   86400 * 7,
			HttpOnly: true,
			SameSite: http.SameSiteStrictMode,
		}

		userBytes, err := json.Marshal(user)
		if err != nil {
			fmt.Println("error marshalling user value")
			return err
		}

		sess.Values["user"] = userBytes

		err = sess.Save(c.Request(), c.Response())
		if err != nil {
			fmt.Println("error saving session: ", err)
			return err
		}

		return c.Render(200, "index", newPageData(user))
	})

	e.POST("/auth/sign-out", func(c echo.Context) error {
		sess, _ := session.Get("session", c)
		sess.Options.MaxAge = -1
		err := sess.Save(c.Request(), c.Response())
		if err != nil {
			fmt.Println("error saving session")
			return err
		}

		return c.Render(200, "index", nil)
	})

	e.GET("/dashboard", func(c echo.Context) error {
		sess, _ := session.Get("session", c)
		if err != nil {
			return c.Render(303, "index", nil)
		}

		if sess.Values["user"] == nil {
			return c.Render(303, "index", nil)
		}

		var user User
		err := json.Unmarshal(sess.Values["user"].([]byte), &user)
		if err != nil {
			fmt.Println("error unmarshalling user value")
			return err
		}

		return c.Render(200, "dashboard", newPageData(user))
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
	Name      string
	Email     string
	Password  []byte
	CreatedAt time.Time
	UpdatedAt *time.Time
}
