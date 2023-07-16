# Simple Task Management REST API

## Endpoints

### Must have

- NodeJs installed
- MySQL or XAMPP to run local server or any MySQL Server installed
- Database Manager like MySQL WorkBench

### How To Use

- Clone Repo
  - Navigate to cloned repo
  - Create Database MySQL Database
  - Configure .env // if necessary for prisma db env
  - Open Terminal
  - Enter Commands
    - npm install
    - npx prisma migrate dev --name init // Initialize Schema
    - npx prisma migrate dev --name updated_migration // Run Migration When you make changes to schema
    - npx prisma generate //Run after migrations to update prisma client
    - lastly if you encounter any prisma related errors please go to their official site for more detailed information

## Features

- Json Web Token Authentication
  - Login / Logout

## All these requests only affects the information related to the authenticated user

### User / Authentication

- Base `/user`
  - `GET` `/`
    ```json
    -- Response Success
    {
      "data": [
        {
          "id": 1,
          "email": "roald@email.com",
          "createdAt": "2023-07-15T06:09:54.655Z",
          "updatedAt": "2023-07-15T06:09:54.655Z",
          "user_information": {
            "user_id": 1,
            "id": "5820e6e6-01c5-4769-aa83-f33749c4c167",
            "first_name": "first_name",
            "middle_name": "middle_name",
            "last_name": "last_name",
            "address": "address",
            "createdAt": "2023-07-15T15:54:29.534Z",
            "updatedAt": "2023-07-15T15:54:29.534Z"
          },
          "Task": [
            {
              "t_id": "b8281577-4089-4837-9c8f-223f42efdc92",
              "user_id": 1,
              "task_title": "Task",
              "task_description": "Task",
              "task_status": "ONGOING",
              "createdAt": "2023-07-15T09:13:25.497Z",
              "updatedAt": "2023-07-15T09:13:25.497Z"
            }
          ]
        }
      ],
      "status": 200,
      "auth": {
        "id": 1,
        "email": "roald@email.com",
        "createdAt": "2023-07-15T06:09:54.655Z",
        "updatedAt": "2023-07-15T06:09:54.655Z"
      }
    }
    ```
  - `POST` `/login`
    ```json
    -- Request Body
    {
      "email": "test@email.com",
      "password": "test!@#123"
    }
    ```
    -- Response Fail
    ```json
    {
      "status": 401,
      "message": "Invalid Email/Password"
    }
    ```
    -- Response Success
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InJvYWxkQGVtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMTVUMDY6MDk6NTQuNjU1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMTVUMDY6MDk6NTQuNjU1WiJ9LCJpYXQiOjE2ODk0MDE0MzUsImV4cCI6MTY4OTQ4NzgzNX0.tL1LJex3HXkOe-Bh0MInXkEa_fF_fy7tN7-E6eiYZE"
    }
    ```
  - `POST` `/register`
    ```json
    -- Response Fail
    {
      "status": 401,
      "message": "Invalid Email/Password"
    }
    ```
    ```json
    -- Response Success
    {
      "status": 201,
      "message": "User Created"
    }
    ```
  - `DELETE` `/logout` logs the authenticated user making the used token to be invalid for future use -- de-authenticates the user

### Task

- Base `/task`

- `POST` `/create`

  ```json
  - Request Body
  {
    "task_title": "Task",
    "task_description": "Task",
    "task_status": "ONGOING"
  }
  ```

  ```json
  -- Response
  {
    "data": {
      "t_id": "b8281577-4089-4837-9c8f-223f42efdc92",
      "user_id": 1,
      "task_title": "Task",
      "task_description": "Task",
      "task_status": "ONGOING",
      "createdAt": "2023-07-15T09:13:25.497Z",
      "updatedAt": "2023-07-15T09:13:25.497Z"
    },
    "status": 201,
    "message": "Task Created"
  }
  ```

- `GET` `/`

  ```json
  -- Response
  {
    "data": [
      {
        "t_id": "b8281577-4089-4837-9c8f-223f42efdc92",
        "user_id": 1,
        "task_title": "Task",
        "task_description": "Task",
        "task_status": "ONGOING",
        "createdAt": "2023-07-15T09:13:25.497Z",
        "updatedAt": "2023-07-15T09:13:25.497Z"
      }
    ],
    "message": "Task Loaded Succesfully!",
    "status": 200
  }
  ```

- `GET` `/search/:search_string`
  ```json
  -- Response
  {
    "data": [
        {
            "t_id": "b8281577-4089-4837-9c8f-223f42efdc92",
            "user_id": 1,
            "task_title": "Task",
            "task_description": "Task",
            "task_status": "ONGOING",
            "createdAt": "2023-07-15T09:13:25.497Z",
            "updatedAt": "2023-07-15T09:13:25.497Z"
        }
    ],
    "message": "Task Loaded Succesfully!",
    "status": 200
  }
  ```
- `PUT` `/update/:t_id`
  ```json
  -- Request Body
  {
    "task_title" : "Task UPDATEs",
    "task_description" : "Task UPDATE",
    "task_status" : "ONGOING"
  }
  ```
  ```json
  -- Response
  {
    "message": "Task Updated",
    "status" : 201
  }
  ```
- `DELETE` `/delete/:t_id` // Deletes Task by its provided it t_id
