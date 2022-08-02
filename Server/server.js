const express = require('express'); // Include ExpressJS
const mongo = require("mongodb").MongoClient // Include MongoDB
var cors = require('cors');
const app = express(); // Create an ExpressJS app

// The body-parser module is middleware that parses user input and makes it available through the req.body property.
const bodyParser = require('body-parser'); // middleware
const { ObjectId } = require('mongodb');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.options('*', cors());

// login response
app.post('/login', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const email = req.body.email;
    const password = req.body.password;
    var success = false;
    var errorMessage;
    var name;
    var id;
    var query = { email: email };
    users.find(query, { projection: { _id: 1, email: 1, password: 1, name: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            if (items.length === 1) {
                if (items[0].password === password) {
                    console.log(items[0].password);
                    success = true;
                    errorMessage = null;
                    name = items[0].name;
                    id = items[0]._id;
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    console.log(errorMessage, success, id, name);
                    return;
                } else {
                    //invalid password
                    success = false;
                    name = null;
                    id = null;
                    errorMessage = "Invalide Password!";
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    return;
                }
            } else {
                // mutilple users with same email
                if (items.length > 1) {
                    res.status(200).json({ users: items });
                    return;
                }
                else {
                    //invalid email
                    success = false;
                    name = null;
                    id = null;
                    errorMessage = "Invalide Email!";
                    res.status(200).json({ "errorMessage": errorMessage, "success": success, "id": id, "name": name });
                    return;
                }
            }
        }
    })
});

// register response
app.post('/register', (req, res) => {
    // Insert register Code Here
    console.log("request: ", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    var success = false;
    var errorMessage;

    // Check if email already register or not?
    var query = { email: email };
    users.find(query, { projection: { _id: 0, email: 1, password: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return;
        } else {
            // if email found skip register new user
            if (items.length === 1) {
                if (items[0].email === email) {
                    errorMessage = "This Email is already registered!";
                    success = false;
                    res.status(200).json({ "errorMessage": errorMessage, "success": success });
                    console.log(items[0].email, " email found!");
                    return;
                }
            }

            console.log(email, " not found!");
            // if email not found register new user
            users.insertOne(
                {
                    name: name,
                    email: email,
                    password: password
                },
                (err, result) => {
                    if (err) {
                        console.error(err)
                        res.status(500).json({ err: err })
                        return
                    }
                    else {
                        success = true;
                        errorMessage = null;
                        res.status(200).json({ "errorMessage": errorMessage, "success": success });
                        console.log("user registered successfully!");
                        return;
                    }
                }
            )
            console.log(name, email, password);
            return;
        }
    })
});


// user name update response
app.put('/user/name', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const id = req.body.id;
    const newName = req.body.newName;
    var success = false;
    var errorMessage;
    console.log(id, newName);
    var query = { _id: ObjectId(id) };
    users.find(query, { projection: { _id: 1, email: 1, password: 1, name: 1 } }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            if (items.length === 1) {
                console.log("found!\n")
                console.log("Old name: ", items[0].name);
                console.log(id, newName);
                users.findOneAndUpdate(query, { $set: { "name": newName } });
                success = true;
                errorMessage = null;
                console.log("Updated name: ", newName);
                res.status(200).json({ "errorMessage": errorMessage, "success": success });
            } else {
                // mutilple users with same email
                errorMessage = "Name not Updated!";
                success = false;
                console.log("length: ", items.length);
                res.status(200).json({ "errorMessage": errorMessage, "success": success });

            }
        }
    })
});


// user name update response
app.delete('/user', (req, res) => {
    // Insert Login Code Here
    console.log("request: ", req.body);
    const id = req.body.id;
    try {
        var success = false;
        var errorMessage;
        console.log("\nDelete: ", id);
        var query = { _id: ObjectId(id) };
        console.log("found!")
        users.deleteOne(query);
        success = true;
        errorMessage = null;
        console.log("Deleted!\n")
        res.status(200).json({ "errorMessage": errorMessage, "success": success });

    } catch (error) {
        errorMessage = "Account not Deleted!";
        success = false;
        console.log("Not Deleted!\n")
        res.status(200).json({ "errorMessage": errorMessage, "success": success });
    }

});

// app.post("/user", (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     // console.log(users);
//     users.insertOne(
//         {
//             name: name,
//             email: email,
//             password: password
//         },
//         (err, result) => {
//             if (err) {
//                 console.error(err)
//                 res.status(500).json({ err: err })
//                 return
//             }
//             console.log(result)
//             res.status(200).json({ ok: true })
//         }
//     )
// })


// app.post("/users", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     var query = { email: email };
//     users.find(query, { projection: { _id: 0, email: 1, password: 1 } }).toArray((err, items) => {
//         if (err) {
//             console.error(err)
//             res.status(500).json({ err: err })
//             return
//         } else {
//             if (items.length === 1) {
//                 if (items[0].password === password) {
//                     console.log(items[0].password);
//                     res.status(200).json(true);
//                 } else {
//                     //invalid password
//                     res.status(200).json(false);
//                 }
//             } else {
//                 // mutilple users with same email
//                 res.status(200).json({ users: items })
//             }
//         }
//     })
// })

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

const url = "mongodb://localhost:27017"

// Next, let’s connect to the database using connect():
// and while we’re here, let’s also get a reference to the names and expenses collections:
let db, users

mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("myapp")
        users = db.collection("users")
    }
)

