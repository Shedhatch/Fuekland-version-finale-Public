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
app.get('/:userEntry/:id/_getUsernames', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT `userId`, `username`, `profileIcon` FROM `utilisateurs` WHERE LOWER(`username`) LIKE LOWER(?) AND userId <> ? ORDER BY username ASC LIMIT 15;'
            let likeParam = "%" + req.params.userEntry + "%";
            let params = [likeParam, req.params.id];
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

//Check friends
app.get('/:id2/:id/_checkFriends', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    client.connect((err) => {
        if (!err) {
            let query = 'SELECT statut, sender FROM amis WHERE (sender = ? AND recipient = ?) OR (recipient = ? AND sender = ?);'
            let params = [req.params.id2, req.params.id, req.params.id2, req.params.id];
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

//Get all participating members to an event
app.get('/:id/_getAttendees', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT utilisateurs.`username`, evenements.eventName FROM `utilisateurs` INNER JOIN participants ON participants.idJoinedUser = utilisateurs.userId INNER JOIN evenements ON evenements.idEvent = participants.idCurrentEvent WHERE utilisateurs.userId = ?;'
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

//Get all events from owner and friends
app.get('/:id/_getEvents', (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    client.connect((err) => {
        if (!err) {
            let query = 'SELECT `idEvent`,`eventName`,`eventDesc`,`eventStart`,`eventEnd`,`eventLoc`,`eventOwner`,`username` FROM evenements INNER JOIN utilisateurs ON utilisateurs.userId = evenements.eventOwner WHERE eventOwner = ? AND idEvent NOT IN (SELECT `idEvent` FROM evenements INNER JOIN participants ON participants.idCurrentEvent = evenements.idEvent WHERE `idJoinedUser` = ?);'
            let params = [req.params.id, req.params.id];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    query = 'SELECT `idEvent`,`eventName`,`eventDesc`,`eventStart`,`eventEnd`,`eventLoc`,`eventOwner`,`username` FROM evenements INNER JOIN utilisateurs ON utilisateurs.userId = evenements.eventOwner WHERE eventOwner IN (SELECT sender FROM amis WHERE recipient = ? AND amis.statut = 1 UNION SELECT amis.recipient FROM amis WHERE sender = ? AND amis.statut = 1) AND idEvent NOT IN (SELECT `idEvent` FROM evenements INNER JOIN participants ON participants.idCurrentEvent = evenements.idEvent WHERE `idJoinedUser` = ?);'
                    params = [req.params.id, req.params.id, req.params.id];
                    client.query(query, params, (err, rows2, fields) => {
                        if (!err) {
                            query = 'SELECT `idEvent`,`eventName`,`eventDesc`,`eventStart`,`eventEnd`,`eventLoc`,`eventOwner` FROM evenements INNER JOIN participants ON participants.idCurrentEvent = evenements.idEvent WHERE `idJoinedUser` = ?'
                            params = [req.params.id];
                            client.query(query, params, (err, rows3, fields) => {
                                if (!err) {
                                    res.json([rows, rows2, rows3])
                                    client.end();
                                } else {
                                    console.log("erreur", err)
                                }
                            })
                        } else {
                            console.log("erreur", err)
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
    })
})

/***********************************/
/************** POST ***************/
/***********************************/

//Insert new settings for a logged user
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
            let query = 'UPDATE `utilisateurs` SET `username`=?,`fname`=?,`iname`=?,`profileIcon`=?,`birthdayDate`=?,`locationActivated`=?'
            let params = [req.body.uname, req.body.fname, req.body.iname, req.body.listOfIconsProfile, req.body.bday, req.body.toggleLoc];

            if (req.body.psw) {
                query += ',`password`=SHA1(?)'
                params.push(req.body.psw)
            }

            query += ' WHERE userId = ?;'
            params.push(req.params.id)

            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    console.log("sucessfully pushed query")
                } else {
                    console.log('error')
                }
                client.end();
            })
        }
    })
})

//Add a new friend
app.post('/_addFriend', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    console.log(req.body)
    client.connect((err) => {
        if (!err) {
            let query = 'INSERT INTO amis (`sender`, `recipient`, `statut`) VALUES (?, ?, 0)'
            let params = [req.body.id, req.body.id2];

            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    console.log("sucessfully pushed AddFriend query")
                    res.send(true)
                } else {
                    console.log('error: ', err)
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
            let query = 'SELECT COUNT(*) as nb FROM `utilisateurs` WHERE `username` = ? AND `password` = SHA1(?);'
            let params = [req.body.uname, req.body.psw];
            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    if (rows[0].nb == 1) {
                        query = 'SELECT `userId` as id FROM `utilisateurs` WHERE `username` = ? AND `password` = SHA1(?);'
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


//Remove friend
app.post('/_removeFriend', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    //console log (req.body) pour obtenir le contenu de ta requete
    client.connect((err) => {
        if (!err) {
            let query = 'DELETE FROM amis WHERE (sender = ? AND recipient = ?) OR (sender = ? AND recipient = ?);'
            let params = [req.body.id, req.body.id2, req.body.id2, req.body.id];
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

//Accept request
app.post('/_acceptRequest', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    console.log(req.body)
    client.connect((err) => {
        if (!err) {
            let query = 'UPDATE `amis` SET `statut`= 1 WHERE `recipient` = ?'
            let params = [req.body.id];

            client.query(query, params, (err, rows, fields) => {
                if (!err) {
                    console.log("sucessfully pushed AddFriend query")
                    res.send(true)
                } else {
                    console.log('error: ', err)
                }
                client.end();
            })
        }
    })
})

//Add User to event
app.post('/_insertAttendees', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    console.log(req.body)
    client.connect((err) => {
        if (!err) {
            let query = 'INSERT INTO `participants`(`idCurrentEvent`, `idJoinedUser`) VALUES (?, ?);'
            let params = [req.body.idEvent, req.body.id];
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

//OptOut event
app.post('/_leaveEvent', upload.fields([]), (req, res) => {
    const client = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    console.log(req.body)
    client.connect((err) => {
        if (!err) {
            let query = 'DELETE FROM `participants` WHERE `participants`.`idCurrentEvent` = ? AND `participants`.`idJoinedUser` = ?;'
            let params = [req.body.idEvent, req.body.id];
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

app.listen(3000, () => {
    console.log(`${hours}:${minutes}:${seconds}` + ` listening at localhost 3000`)
});