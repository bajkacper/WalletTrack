FROM gradle:8-jdk21 as builder

WORKDIR /app

# Kopiowanie plików zależności Gradle
COPY gradle /app/gradle
COPY build.gradle /app/
COPY settings.gradle /app/

# Pobranie zależności (Gradle będzie je przechowywał w cache)
RUN gradle build --no-daemon

# Kopiowanie całego kodu źródłowego
COPY . .

# Budowanie aplikacji
RUN gradle build --no-daemon

# Etap 2: Aplikacja
FROM amazoncorretto:21
# Ustawienie zmiennych środowiskowych
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk
ENV PATH=$PATH:$JAVA_HOME/bin

# Praca w katalogu /app
WORKDIR /app

# Kopiowanie zbudowanego JAR-a z poprzedniego etapu
COPY --from=builder /app/build/libs/*-SNAPSHOT.jar /app/*-SNAPSHOT.jar

# Uruchamianie aplikacji
CMD java -jar /app/*-SNAPSHOT.jar

# Eksponowanie portu 8080
EXPOSE 8080
