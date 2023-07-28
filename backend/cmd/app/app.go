package main

import (
	"fmt"
	"log"
	"net/http"
)

func а() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
func main() {
	fmt.Println("Пора работать")
}
