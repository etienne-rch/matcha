FROM node:22.2.0-alpine

# Set the working directory
WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy only dependency files (optimize Docker cache)
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Expose the port (from .env => 3000)
EXPOSE 3000

# Start command in dev mode
CMD ["yarn", "dev"]
