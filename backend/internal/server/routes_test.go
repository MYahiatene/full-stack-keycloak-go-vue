package server

import (
	"backend/internal/database"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloWorldHandler(t *testing.T) {
	s := &Server{db: nil}
	server := httptest.NewServer(http.HandlerFunc(s.HelloWorldHandler))
	defer server.Close()
	resp, err := http.Get(server.URL)
	if err != nil {
		t.Fatalf("error making request to server. Err: %v", err)
	}
	defer resp.Body.Close()
	// Assertions
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status OK; got %v", resp.Status)
	}
	expected := "{\"message\":\"Hello World\"}"
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("error reading response body. Err: %v", err)
	}
	if expected != string(body) {
		t.Errorf("expected response body to be %v; got %v", expected, string(body))
	}
}

//todo: health handler mit testcontainer

func TestHealthHandler(t *testing.T) {
	db := database.New()
	s := &Server{db: db}

	defer db.Close()
	rec := httptest.NewRecorder()

	req := httptest.NewRequest(http.MethodGet, "/health", nil)

	s.healthHandler(rec, req)
	resp := rec.Result()

	body, _ := io.ReadAll(resp.Body)

	defer resp.Body.Close()
	// Assertions
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Errorf("expected status StatusServiceUnavailable; got %v", resp.Status)
	}

	expected := "Failed to ping database\n"
	if string(body) != expected {
		t.Errorf("Wrong body %s", body)
	}
}
