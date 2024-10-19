# PMC Transport

## How's started?

### 1. Clone the repository

```bash
git clone https://github.com/Sukikui/PMC-Transport.git
```

### 2. Install the dependencies

Check if npm is installed on your machine.

```bash
node -v
npm -v
```

If not, install it.

**macOS**
```bash
brew install node
```

**Linux**
```bash
sudo apt-get install nodejs
sudo apt-get install npm
```

**Windows**
[Download Node.js](https://nodejs.org/en/download/)

Recheck if npm is installed on your machine.

```bash
node -v
npm -v
```

Then, open a terminal in `PMC-Transport` directory and install the dependencies.

```bash
npm install
```

### 3. Start the Backend Server

Open a terminal in `PMC-Transport` directory and run the server on the port 3000 of your machine.

```bash
node backend/server.js
```

Then, the server is running on http://localhost:3000.

You can try the API by accessing http://localhost:3000/api/stations.

### 4. Test the Web Page

In `PMC-Transport/frontend` directory, open the `index.html` file in your browser :)
