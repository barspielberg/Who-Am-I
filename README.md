# Who Am I? [See here!🚀](https://who-am-i-1.herokuapp.com)

A MVC Node.js project for creating personality questionnaires that can be sent to friends

---

## Requirements

- Node.js v13.12.0 or higher
- MongoDB connection (can create on [atlas](https://www.mongodb.com/cloud/atlas))
- [google credentials project](https://console.developers.google.com/apis/credentials)

---

## Install

    git clone https://github.com/barspielberg/Who-Am-I.git
    cd Who-Am-I
    npm install

## Configure app
1. Create a `nodemon.json` file:
    ```powershell
    New-Item -Name nodemon.json -ItemType File
    ```

2. open `nodemon.json` and paste:
    ```json
    {
        "env":{
            "MONGODB_URI": "<MONGODB_URI>",
            "clientSecret":"<clientSecret>",
            "clientID":"<clientID>",
            "googleCallbackURL": "http://localhost:3000/google/callback"
        }
    }
    ```
3. replace:
    - `<MONGODB_URI>` => your mongoDB uri
    - `<clientSecret>` => your google credentials "clientSecret"
    - `<clientID>` => your google credentials "clientID"

## Running the project
    npm run start:dev

   open: `http://localhost:3000/`
