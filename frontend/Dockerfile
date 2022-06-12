FROM node:16 as node

# Set the working directory
WORKDIR /usr/src/app/frontend

# Add the source code to app
COPY ./ /usr/src/app/frontend

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.13.12-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=node /usr/src/app/frontend/dist/frontend /usr/share/nginx/html


# Expose port 80
EXPOSE 80