FROM oven/bun:latest

WORKDIR /app 

# Install dependencies first (better layer caching)
COPY package.json bun.lock* ./
RUN bun install

# Copy the rest of the project
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]