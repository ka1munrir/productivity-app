# To-Do Phone App

**To-Do App**

A basic mobile to-do application.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)

## Introduction

This to-do app is a dynamic and user-friendly mobile application for keeping track of things you might need or want to do. 

## Features

- **Login/Signup:** Securely create and manage your account, ensuring your tasks are accessible from anywhere.
  
- **Task Lists** You can keep track of your tasks in task lists which can be editted, deleted and repeated
  
- **Shopping List:** Keep track of the items you need to shop for and connect them to a to-do using the "Shopping" keyword

## Getting Started

To install this project first be sure that you have the latest version of node.js installed which you can do [here](https://nodejs.org/en).
Then fork and clone the repository onto your local machine.
Then, in your terminal, run 
```bash
cd server
pipenv install && pipenv shell
flask db init
flask db migrate
flask db upgrade head

```
to install the dependencies for the server and initialize the database
You can also seed the database by running in the pipenv shell
```bash
python seed.py
```
In a separate terminal, run
```bash
cd client
npm install
```
If you run into any errors run:
```bash
npx expo install
```

To run the project, in two different terminals run:
```bash
cd server
pipenv install && pipenv shell
python app.py
```
```bash
cd client
npx expo start --tunnel
```
*To run this project on mobile you will need to set up the flask backend with a ssl certificate to convert the route from http to https and you will need to change the route in client/network/axiosInstance.js from http to https*