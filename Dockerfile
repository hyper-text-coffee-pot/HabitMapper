# Stage 1: Build the Ionic Angular app
FROM node:22-alpine as build

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Build the Ionic Angular app
RUN if [ "$NODE_ENV" = "development" ]; then ionic build --configuration development; else ionic build --configuration production; fi

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /usr/src/app/www /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 and 4200
EXPOSE 80 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]