# Etap 1: Budowanie aplikacji
FROM gradle:8-jdk21-alpine as builder

WORKDIR /app

# Kopiowanie całego projektu
COPY . .

# Budowanie fat JAR-a Spring Boot
RUN gradle bootJar --no-daemon -no-build-cache

# Etap 2: Obraz uruchomieniowy
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Kopiowanie gotowego JAR-a z builda
COPY --from=builder /app/build/libs/*-SNAPSHOT.jar app.jar

# Uruchamianie aplikacji
CMD ["java", "-jar", "app.jar"]

EXPOSE 8080
