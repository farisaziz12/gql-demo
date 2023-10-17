FROM node:16.10.0

# Specify the working directory INSIDE the container
WORKDIR /usr/client

# Move the package.json and package-lock.json into the container to install dependencies
COPY package*.json ./

# Install the dependencies
RUN yarn
# Copy the source code
COPY . .

# Expose the port
EXPOSE 8080

# Start the server
CMD ["yarn", "start"]