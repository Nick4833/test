# Installation for Code Test

The two folder <code>frontend</code> and <code>backend</code> are needed to be installed and ran to view the application. Additionally, a MySQL script is needed to be run to create tables needed for the application

## Creating MySQL Tables

In the <code>backend</code> folder, there are two files namely <code>test.mwb</code> and <code>test.sql</code>. 

### Viewing the ER Diagram
The ER Diagram can be viewed by opening the <code>test.mwb</code> and clicking on the ER Diagram icon.

### Creating a Schema and Tables
You will need to create a schema to run the <code>test.sql</code>. Create a schema named "test" using the MySql workbench. After that, you'll just need to run the <code>test.sql</code> script by using <code>Run Script</code> option. 

## Installing and Running the backend

 - First off, run <code>npm install</code> to install all the needed modules.
 - You will have to put in a <code>.env</code> file to put in the configurations.
<code>HOST="localhost"
USER="--your_username--"
PASSWORD="--your_password--"
DATABASE="test"
PORT="80" </code>
 - Run <code>npm run dev</code> to run the backend
 - The backend will be running at <code>localhost:80</code>

## Installing and Running the frontend

 - First off, run <code>npm install</code> to install all the needed modules.
 - Run <code>npm run dev</code> to run the frontend
 - The frontend will be running at <code>http://localhost:5173/</code> by default

