APP_NAME=app
BUILD_DIR=build
MAIN_FILE=main.go

.PHONY: all build run clean tidy fmt vet

all: build

## Build the application
build:
	@echo "Building application..."
	@mkdir -p $(BUILD_DIR)
	go build -o $(BUILD_DIR)/$(APP_NAME) $(MAIN_FILE)

## Run the application
run: build
	@echo "Running application..."
	./$(BUILD_DIR)/$(APP_NAME)

## Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...

## Run go vet
vet:
	@echo "Running go vet..."
	go vet ./...

## Download dependencies
tidy:
	@echo "Tidying modules..."
	go mod tidy

## Clean build artifacts
clean:
	@echo "Cleaning build files..."
	go clean
	rm -rf $(BUILD_DIR)

## Build optimized production binary
prod-build:
	@echo "Building production binary..."
	@mkdir -p $(BUILD_DIR)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
	go build -ldflags="-s -w" -o $(BUILD_DIR)/$(APP_NAME) $(MAIN_FILE)