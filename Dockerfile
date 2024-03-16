# Use the official Ubuntu image as the base image
FROM ubuntu:latest

# Set the working directory inside the container
WORKDIR /app

# Copy pre-built binary into the container
COPY bin/keep-calm-and-carry-on /app/keep-calm-and-carry-on

# Copy all static files into the container
COPY static /app/static

# Copy all template files into the container
COPY templates /app/templates

# Expose port 8080 to run the application
EXPOSE 8080

# Command to run the application
CMD ["./keep-calm-and-carry-on"]
