const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const upload = multer();
const app = express();
app.use(cors());
const host = 'localhost';
const user = 'root';
const password = '';
const database = 'fueklandapp';
var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

//Get all infos about a logged user
app.get('/:id/_getInfos', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT * FROM `utilisateurs` WHERE `userId` = ?;'
            let params = [req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

//Get all usernames
app.get('/:userEntry/_getUsernames', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT `userId`, `username`, `profileIcon` FROM `utilisateurs` WHERE LOWER(`username`) LIKE LOWER(?) ORDER BY username ASC;'
            let likeParam = "%" + req.params.userEntry + "%";
            let params = [likeParam];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

//Get all events
app.get('/:id/_getEvents', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            //console.log(req.body)
            let query = 'SELECT * FROM `evenements` WHERE `eventOwner` = ?;'
            let params = [req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

//Get joining users to an event
app.get('/:id/_getJoiningUsers', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            //console.log(req.body)
            let query = 'SELECT utilisateurs.username FROM `evenements` INNER JOIN participants ON participants.idCurrentEvent = evenements.idEvent INNER JOIN utilisateurs ON utilisateurs.userId = participants.idJoinedUser WHERE evenements.eventOwner = ? AND evenements.idEvent = 1;'
            let params = [req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

//Get pos from current user
app.get('/:id/_getCurrentPos', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT `latPos` ,`longPos` ,`profileIcon`, locationActivated FROM `utilisateurs` WHERE `userId` = ?;'
            let params = [req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

//Get pos from friends
app.get('/:id/_getCurrentPosFromFriends', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT utilisateurs.iname, utilisateurs.profileIcon, latPos, longPos FROM amis INNER JOIN utilisateurs ON utilisateurs.userId = amis.sender WHERE recipient = ? AND amis.statut = 1 AND utilisateurs.locationActivated = 1 UNION SELECT utilisateurs.iname, utilisateurs.profileIcon, latPos, longPos FROM amis INNER JOIN utilisateurs ON utilisateurs.userId = amis.recipient WHERE sender = ? AND amis.statut = 1 AND utilisateurs.locationActivated = 1;'
            let params = [req.params.id, req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    res.json(rows)
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
        client.end();
    })
})

/***********************************/
/************* INSERT **************/
/***********************************/

//Insert new user pos from logged user
app.post('/:id/_setSettings', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    console.log(req.body)
    client.connect((err) => {
        if (!err) {
            let query = 'UPDATE `utilisateurs` SET `username`=?, `password`=?,`fname`=?,`iname`=?,`profileIcon`=?,`birthdayDate`=?,`locationActivated`=? WHERE userId = ?;'
            let params = [req.body.uname, req.body.psw, req.body.fname, req.body.iname, req.body.listOfIconsProfile, req.body.bday, req.body.toggleLoc, req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    console.log("sucessfully pushed query")
                        // res.send(true)
                } else {
                    console.log('error')
                }
                client.end();
            })
        }
    })
})

//Insert new user pos from logged user
app.post('/:id/_setNewPos', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    //console log (req.body) pour obtenir le contenu de ta requete
    client.connect((err) => {
        if (!err) {
            let query = 'UPDATE `utilisateurs` SET `latPos`= ?, `longPos`= ? WHERE `userId` = ?;'
            let params = [req.body.lat, req.body.long, req.params.id];
            console.log(query)
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    console.log("sucessfully pushed query")
                    res.send(true)
                } else {
                    console.log('error')
                }
                client.end();
            })
        }
    })
})

//Insert login credits from any users
app.post('/_login', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT COUNT(*) as nb FROM `utilisateurs` WHERE `username` = ? AND `password` = ?;'
            let params = [req.body.uname, req.body.psw];
            console.log(query)
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    if (rows[0].nb == 1) {
                        query = 'SELECT `userId` as id FROM `utilisateurs` WHERE `username` = ? AND `password` = ?;'
                        client.query(query, params, (err, rows, fields) => {
                            if (!err) {
                                console.log(String(rows[0].id))
                                res.send(String(rows[0].id))
                            } else {
                                res.send("0")
                            }
                        })
                    } else {
                        res.send("0")
                    }
                } else {
                    console.log('error')
                }
                client.end();
            })
        }
    })
})

app.listen(3000, () => {
    console.log(`${hours}:${minutes}:${seconds}` + ` listening at localhost 3000`)
});