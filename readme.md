<div align="center">

# React Time Logging

by <a rel="author" href="http://github.com/kkosmowski/">kkosmowski</a>

LIVE: <a href="http://kkosmowski-time-logging.netlify.app/" target="_blank">kkosmowski-time-logging.netlify.app</a>

</div>

---

## Table of contents

* [Description](#description)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [App customization](#app-customization)
* [Features](#features)
* [Author](#author)

---

## Description

React Time Logging is a web application written in Javascript, using React library.

The purpose of this app is to allow user to store his daily tasks in a readable way. User can customize the app in multiple ways (see [App customization](#app-customization) section for more), and easily manipulate created tasks.

It is an extended, second version of vanilla JS application I built some time ago, called <a href="https://github.com/kkosmowski/jira-like-time-logging" target="_blank">JIRA-Like Time Logging</a>.<br>
The original app was limited to adding, viewing, editing and deleting tasks, primitive form validation, bulk deleting tasks and confirmation dialog.

To see the differences in features, please see [Features](#features) section.

---

## Technologies

* `react` as the fundamental library
* `typescript` for safe typing
* `react-redux` and `redux-toolkit` for state management
* `antd` as the UI library and icons
* `styled-components` and `sass` for styling
* `formik` for form management and `yup` for validation schema
* `moment` for date handling
* `react-beautiful-dnd` for drag-n-drop
* `i18next` & `react-i18next` for translation handling
* `localbase` for storing the data in indexed-db

---

## Installation

In order to be able to properly install and run the application, **Node** and either **npm**  or **yarn** must be installed.

To install the app dependencies, run either yarn or npm command:
* `yarn install`
* `npm install`

depending on your package manager of choice.

---

## Usage

To run the app, run either one of these:
* `yarn start`
* `npm start`

This will compile TypeScript and open a new tab in your default browser, most likely at http://localhost:3000/

---

## App customization

Application is open for customization through Settings Dialog (opened by a button in right-hand top corner of the app).

User can set multiple different options:
* weekend display (display only weekdays, weekdays with saturday or full week)
* first day of the week
* target hours per day (amount of hours that are expected each day to reach 100% of progress bar)
* limit of hours per day (amount of hours that cannot be exceeded)
* language
* theme

---

## Features
- Creating, viewing, updating, duplicating and deleting tasks;
- Creating, updating and deleting categories; 
- Advanced form validation, user-friendly duration input;
- Bulk deleting tasks;
- Confirmation dialog;
- Customization of application and board;
- Drag n drop of tasks (with validation of day limit);
- Context menu with cut, copy and paste (with validation of day limit);
- Filters with option to set as default (loaded on app load);

---

## Author

React Time Logging was created by <a rel="author" href="http://github.com/kkosmowski/">kkosmowski</a>

You are free to use the app without any costs (both personal and professional use), however it is prohibited to claim to be the author or owner of this app.
