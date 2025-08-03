# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 4000

# Run the server
CMD ["npm", "run", "dev"]
