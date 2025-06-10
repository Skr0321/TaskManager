FROM eclipse-temurin:21-jdk-alpine
LABEL authors="ASUS"

# Create app directory
WORKDIR /app

# Copy jar file
COPY target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
