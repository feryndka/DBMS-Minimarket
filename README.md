<h1 align="center">TYPESCRIPT AND MYSQL</h1>

+ How to Setup Express Typescript:
    -   npm init --yes
    -   npm install express mysql2
    -   npm i -D typescript @types/express @types/node
    -   npx tsc --init
    -   npm i -D concurrently nodemon
    -   Edit "scripts" on "package.json" with this Code: <br />
        "scripts": { <br />
            "build": "npx tsc", <br />
            "start": "node dist/index.js", <br />
            "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"" <br />
        },
    
    -   Edit "tsconfig.json" on this line: <br />
        29. "rootDir": "./src" <br />
        58. "outDir": "./dist" <br />

        How to Running? npm run dev

Create REST API for Dashboard Management System of Minimarket. <br />
+ Requirement : 
    - Use ExpressTS to create REST API
    - Use MySql as data source
+ Data :
    - Admin 
       - Fields: Id, Username, Password
    - User
       - Fields: Id, Email, Password
    - Products
       - Fields: Id, Name, Price, Stock
    - Transaction
       - Fields: Id, UsersId, ProductsId, Qty, CreatedAt

Features : 
1. Admin
    -   Admin Login // /admin-login POST
    -   Get Transaction List by Date Range // /admin-transaction GET
    -   Get Total Income by Date Range // /admin-income GET
2. User
    -   User Login // /users POST
    -   Get Products List /products GET
    -   Create Transaction (Validate Qty, Qty Cant More Than Stock) // /transactions POST
    -   Get History Transaction // /transactions GET 
