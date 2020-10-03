<<<<<<< HEAD:ReadMe.md
# E-commerce API
> You can view the list of APIs [here](https://backendapi.turing.com/docs/#/).

## Steps 1: Install Node.js and npm
- Open your terminal or press Ctrl + Alt + T.
- To install node.js use the following command:
>**sudo apt install nodejs**
- Once installed, verify it by checking the installed version using the following command:
>**node -v** or **node –version**
- Install Node Package Manager(NPM) with Node.js. NPM is an open source library of Node.js packages.  
To install NPM, use the following commands:
>**sudo apt install npm**
>**npm -v** or **npm –version**
- use the following commands to update and upgrade the package manager:
>**sudo apt-get update**  
>**sudo apt-get upgrade**

## Step 2: Install MySQL server
- use [this link](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04) to install install MySQL server on your system
- You can then use following command to run MySQL server on your terminal:
> **mysql -u root -p**
> **Enter password**: <Enter your MySQL password here set at the time if installation. The password wont be visible (not even *) when you type it.
> Press enter.

## Step 3: Clone this repo on your local
To clone this repository on your local machine, run the following command on terminal:
> git clone https://github.com/sagarguglani15/E-commerce-API.git

**Enter your github username and password for git permissions.**

## Step 4: Create DataBase
On the MySQL server, create a database (say ecom) using following command:
> **create database ecom**;


## Step 5: Provide environment varibales
Before starting your server, you need to tell your server 2 things:

- password for your database
- your secret key for password hashing

We will now add these to our code:

- run following command on IDE terminal:
> **touch .env**
- add following to your .env file created:
> DBPASS=\<your db password>
> SECRETKEY=\<some secret key>

**Note:** spaces are not allowed before or after equality sign.

## Step 6: Start the server
By this, you have E-commerce folder created as your root directory.
Open this in any IDE ( WebStorm/ VS Code)

- on the IDE terminal, run the following command to install the dependent Node libraries:
> **npm install**

- run the server using following command:
> **npm start**

Congratulations, your server is started now on the port:5000 !


## Step 7: Postman testing
Install Postman using following command:
> **sudo snap install postman**

Once the postman gets installed, you can import [E-commerce.postman_collection.json](https://github.com/sagarguglani15/E-commerce-API/blob/master/E-commerce.postman_collection.json "E-commerce.postman_collection.json") file as your collection and test all 29 APIs !
=======
# E-commerce API
> You can view the list of APIs [here](https://backendapi.turing.com/docs/#/).

## Steps 1: Install Node.js and npm
- Open your terminal or press Ctrl + Alt + T.
- To install node.js use the following command:
>**sudo apt install nodejs**
- Once installed, verify it by checking the installed version using the following command:
>**node -v** or **node –version**
- Install Node Package Manager(NPM) with Node.js. NPM is an open source library of Node.js packages.  
To install NPM, use the following commands:
>**sudo apt install npm**
>**npm -v** or **npm –version**
- use the following commands to update and upgrade the package manager:
>**sudo apt-get update**  
>**sudo apt-get upgrade**

## Step 2: Install MySQL server
- use [this link](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04) to install install MySQL server on your system
- You can then use following command to run MySQL server on your terminal:
> **mysql -u root -p**
> **Enter password**: <Enter your MySQL password here set at the time if installation. The password wont be visible (not even *) when you type it.
> Press enter.

## Step 3: Clone this repo on your local
To clone this repository on your local machine, run the following command on terminal:
> git clone https://github.com/sagarguglani15/E-commerce-API.git

**Enter your github username and password for git permissions.**

## Step 4: Create DataBase
On the MySQL server, create a database (say ecom) using following command:
> **create database ecom**;


## Step 5: Provide environment varibales
Before starting your server, you need to tell your server 2 things:

- password for your database
- your secret key for password hashing

We will now add these to our code:

- run following command on IDE terminal:
> **touch .env**
- add following to your .env file created:
> DBPASS=\<your db password>
> SECRETKEY=\<some secret key>

**Note:** spaces are not allowed before or after equality sign.

## Step 6: Start the server
By this, you have E-commerce folder created as your root directory.
Open this in any IDE ( WebStorm/ VS Code)

- on the IDE terminal, run the following command to install the dependent Node libraries:
> **npm install**

- run the server using following command:
> **npm start**

Congratulations, your server is started now on the port:5000 !


## Step 7: Postman testing
Install Postman using following command:
> **sudo snap install postman**

Once the postman gets installed, you can import [E-commerce.postman_collection.json](https://github.com/sagarguglani15/E-commerce-API/blob/master/E-commerce.postman_collection.json "E-commerce.postman_collection.json") file as your collection and test all 29 APIs !
>>>>>>> 12929cfa4f263e776b95df90565f87a781576971:ReadMe
