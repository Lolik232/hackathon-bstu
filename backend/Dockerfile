FROM golang:latest

ADD . /app

WORKDIR /app

RUN go version

ENV  GOPATH=/

EXPOSE 8080

RUN go mod download
RUN go build -o app cmd/app/app.go

RUN chmod +x ./app

CMD ["./app"] 