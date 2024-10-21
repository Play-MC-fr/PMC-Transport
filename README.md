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

<table>
<thead>
<tr>
<th>OS</th>
<th>Commands</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**macOS**

</td>
<td>

```bash
brew install node
```

</td>
</tr>
<tr>
<td>

**Linux**

</td>
<td>

```bash
sudo apt-get install nodejs
sudo apt-get install npm
```

</td>
</tr>
<tr>
<td>

**Windows**

</td>
<td>

[Download Node.js](https://nodejs.org/en/download/)

</td>
</tr>
</tbody>
</table>

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

Then, the server is running, and you can try the API by accessing http://localhost:3000/api/stations.

### 4. Test the Web Page

In `PMC-Transport/frontend` directory, open the `index.html` file in your browser :)
