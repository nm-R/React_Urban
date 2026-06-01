# ── Stage 1: compilação ──────────────────────────────────
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Instala o Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copia pom.xml primeiro para cachear as dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copia o código e compila
COPY src ./src
RUN mvn clean package -DskipTests

# ── Stage 2: imagem final (menor, só JRE) ────────────────
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
