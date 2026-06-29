# CS208 Full Stack Final Project - Donut Shop Application

- Name: Kyler Barela
- GitHub: [https://github.com/Kyler-ba]
- Term: Summer 2026

## Project Description

This is my full-stack application for CS208, built with node.js. I built a web
page for a local donut shop that allows users to view and order donuts
online. The application uses Express for the backend and MariaDB (MySQL) for the
database. Please read the following instructions carefully because some of the
setup only needs to be done once.

## Install the Database

To set up and install the database, run the `install_db.sh` script in the setup_scripts
directory.

```bash
./setup_scripts/install_db.sh
```

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Start the data base 

Without runnning this code before starting you will run into errors 
conencting to the database:

```bash
sudo service mariadb start
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by opening port 3000. A 
popup will also apear in the bottom right in a second which can be used 
to open the web page