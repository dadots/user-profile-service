# Use Node.js LTS version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "dev"]