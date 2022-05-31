const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connection = require ('./db')
const bcrypt = require('bcrypt');
const { connect } = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.post('/registr',(req,res)=>{

    let username = req.body.login
    let password = req.body.password
    let email = req.body.email
    let phone = req.body.phone
    let address = req.body.address
    let statusUser =  username.slice(0,5) === 'admin'?1:2;
    statusUser !== 2?username = username.split('_')[1]:username = username;
     
   console.log(username+" "+password+" "+email+" "+phone+" "+address);

    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(password,salt);

    const datas =[username,passwordToSave,email,phone,address,statusUser];


    connection.query('INSERT INTO client VALUES (?,?,?,?,?,?,0,2000);',datas,(err,result)=>{
        console.log(res);
        if(err){
            res.send({err:err})
        }
            if (result.length >0){
                res.send({message: 'Неверно введены данные !'})
            }else{
                res.send({message: 'OK'});
                console.log('Added')
            }
         }
)})

app.post ('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(password,salt);

    connection.query('SELECT * FROM client WHERE Login = ?',username,(err,result)=>{
        if(err){
            res.send({err:err});
        }
        
            if (result.length>0){
                bcrypt.compare(password,result[0].Password,(err,res2)=>{
                    if(err){
                        console.log({err:err})
                    }
                    if(res2){
                        console.log(res2);
                        res.send(result);
                    }else{
                        console.log(res2);
                        res.send({message:'Неверно введены данные!'})
                    }
                })
            }else{
                res.send({message:'Неверно введены данные!'})
            }
    })
        // bcrypt.compare(password,result[0].Password,(err,res2)=>{
            // if (res2)
            // {
            //     res.send(res2);
            // }
            // else {
            //     console.log(result)
            //     res.send(res2)
            // }
            
        
//         }
//     )
 })


app.post('/goods', (req,res)=>{
    res.set("Access-Control-Allow-Origin","*")
    connection.query('SELECT * FROM product',(err,result)=>{
        if(err){
            console.log(err);
        }
        
            if (result.length>0){
                res.send(result)
            }else{
                console.log('No info in this table')
            }
        }
    )
})

app.post('/profil',(req,res)=>{
    const login = req.body.login;
    connection.query('SELECT *FROM client WHERE Login =?',login,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result)
            if (result){
                console.log('success')
                res.send(result)
            }else{
                console.log('No info in this table')
            }
    })
})

app.post('/profilZakaz',(req,res)=>{
    const user = req.body.user;
    console.log(user);
    connection.query('SELECT *FROM zakaz WHERE Client =?',user,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
            if (result.length>0){
                console.log('success')
                // connection.query(`SELECT ProdN from product WHERE ID='${result.data[0].prodID}';`,(error,resultAfter)=>{
                //     if(err){
                //         console.log(err);
                //     }
                    
                //         if (result.length>0){
                //             console.log('success')
                //             res.send([{
                //                 prodName:resultAfter.data[0].ProdN,
                //                 kolich:result.data[0].Kolich
                //             }])
                //         }else{
                //             console.log('No info in this table')
                //         }
                // })
                
                res.send(result)
            }else{
                console.log('No info in this table')
            }
    })
})

app.post ('/addToBd',(req,res)=>{
    const order = req.body.order;
    const user = req.body.user;
    const sum = req.body.sum;

    console.log(order)
    console.log(user)
    console.log(sum)

    for (let i=0;i<order.length;i++)
    {
        connection.query(`SELECT ID FROM product WHERE prodN ='${order[i].name}'`,(err,result)=>{
            if(err){
                console.log(err);
            }
            
                if (result.length>0){
                    console.log(order)
                    const currentDate = new Date().getFullYear() + '-' +(new Date().getMonth()+1)+'-'+new Date().getDate()+ ' ' + new Date().getHours() + ':'+new Date().getMinutes() + ':'+new Date().getSeconds();
                    connection.query(`INSERT INTO zakaz (prodID,Client,Kolich,TimeOfOrd) VALUES (${result[0].ID},'${user}','${order[i].quantity}','${currentDate}')`,(errr,resultatik)=>{
                        console.log(resultatik)
                        if(errr){
                            console.log(errr);
                        }
                    })
                }else{
                    console.log('No info in this table')
                }
        })
        
    }

    connection.query('UPDATE client SET Balance = client.Balance-? WHERE Login = ? ',[sum,user],(err,result)=>{
        if(err) console.log(err)
        res.send({status:'OK'})
    })
    
})

app.post('/mon',(req,res)=>{
    const sum = req.body.sum;
    const user = req.body.user;
    connection.query('SELECT Balance FROM client WHERE Login = ?',user,(err,result)=>{
        if(err){
            console.log(err);
        }
        
            if (result.length>0){
                console.log('success')
                const answerS = (sum<=result[0].Balance) ? true:false;
                res.send(answerS)
            }else{
                console.log('No info in this table')
            }
    })
})

app.post('/popolnenie',(req,res)=>{
    const user = req.body.user;
    const sum = req.body.sum;

    console.log(user+sum)

    connection.query(`UPDATE client SET Balance = client.Balance + ${+sum} WHERE Login = "${user}"`,(err,result)=>{
        if(err) console.log(err)

        res.send(result);
    })
})

app.post ('/profilZakazName',(req,res)=>{
    const idTovar = req.body.id;
    
    connection.query('SELECT prodN FROM product WHERE ID = ?',idTovar,(err,result)=>{
        if(err){
            console.log(err);
        }
        
            if (result.length>0){
                console.log('success')
                res.send(result)
            }else{
                console.log(idTovar);
                console.log('No info in this table')
            }
    })
})

app.post('/profilZakaz2',(req,res)=>{
    const user = req.body.user;
    
    connection.query('SELECT product.prodN,zakaz.Kolich FROM zakaz INNER JOIN product ON zakaz.prodID = product.ID WHERE zakaz.Client = ? ORDER BY zakaz.TimeOfOrd DESC LIMIT 4',[user],(err,result)=>{
        if(err) console.log(err)

        res.send(result);
    })
})

app.get ('/tableOrders',(req,res)=>{
    const QUERY_MY = `SELECT zakaz.ID,zakaz.prodID,zakaz.Client,zakaz.Kolich,zakaz.TimeOfOrd,product.ProdN FROM zakaz INNER JOIN product ON zakaz.prodID = product.ID ORDER BY zakaz.ID DESC;`
    connection.query(QUERY_MY,(err,result)=>{
        if(err)
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.get ('/tableUsers',(req,res)=>{
    const QUERY_MY = `SELECt client.Login,client_status.Status,client.Banned FROM client INNER JOIN client_status ON client.Status_ID = client_status.ID ORDER BY client_status.Status;`
    connection.query(QUERY_MY,(err,result)=>{
        if(err)
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post ('/makeAdmin',(req,res)=>{
    const user = req.body.user;

    connection.query ('UPDATE client SET Status_ID = 1 WHERE Login =?',user,(err,result)=>{
        if(err) console.log(err)
        res.send(result)
    })
}) 

app.post ('/makeBanned',(req,res)=>{
    const user = req.body.user;
    const bannedStatus = req.body.bannedStatus?0:1;
    const datas = [bannedStatus,user]

    connection.query('UPDATE client SET Banned = ? WHERE Login = ?',datas,(err,result)=>{
        if (err) console.log (err)
        res.send(result)
    })
})

app.post ('/recom',(req,res)=>{
    const user = req.body.user;
    var leftRightOneMore = {};

    connection.query('SELECT product.ID,product.prodN,product.FrontRear,product.LeftRight,TimeOfOrd,zakaz.Kolich FROM zakaz INNER JOIN product ON zakaz.prodID = product.ID WHERE zakaz.Client = ? ORDER BY TimeOfOrd DESC LIMIT 1;',[user],(err,result)=>{
        if(err) console.log(err)
        console.log(result)
        if(result.length){
            const lastProdN = result[0].prodN;
            const placeFrontRear = result[0].FrontRear;
            let placeLeftRight = result[0].LeftRight;
            let productID = result[0].ID;
            
    
            console.log(placeLeftRight)
            if(placeLeftRight)
            {
                if(placeLeftRight === 'left')
                {
                    placeLeftRight = 'right'
                    connection.query (`SELECT product.ProdN, prod_type.Name,product.Picture,product.Cost,product.StranaPr FROM  product INNER JOIN prod_type ON product.ID = prod_type.productID WHERE prod_type.Name = (SELECT Name FROM prod_type INNER JOIN product on prod_type.productID = product.ID WHERE product.ID = '${productID}') AND product.LeftRight = '${placeLeftRight}' AND product.FrontRear ='${placeFrontRear}' ;`,(err3,result3)=>{
                if(err3) console.log(err3)
                connection.query(`SELECT * FROM product WHERE FrontRear = '${placeFrontRear}' AND ProdN != '${lastProdN}' AND ProdN != '${result3[0].ProdN}' LIMIT 3`,(err2,result2)=>{
                    if(err2) console.log(err2)
                    let allRec = new Array(4);
                    allRec[0] = {
                        ...result3[0],
                        important:1
                    };
                    for (let i =1;i<4;i++)
                    {
                        allRec[i] = result2[i-1];
                    }
                    console.log(allRec)
                res.send(allRec)
                })
            })
                }else {
                    placeLeftRight = 'left'
                    connection.query (`SELECT product.ProdN, prod_type.Name,product.Picture,product.Cost,product.StranaPr FROM  product INNER JOIN prod_type ON product.ID = prod_type.productID WHERE prod_type.Name = (SELECT Name FROM prod_type INNER JOIN product on prod_type.productID = product.ID WHERE product.ID = '${productID}') AND product.LeftRight = '${placeLeftRight}' AND product.FrontRear ='${placeFrontRear}' ;`,(err3,result3)=>{
                if(err3) console.log(err3)
                connection.query(`SELECT * FROM product WHERE FrontRear = '${placeFrontRear}' AND ProdN != '${lastProdN}' AND ProdN != '${result3[0].ProdN}' LIMIT 3`,(err2,result2)=>{
                    if(err2) console.log(err2)
                    console.log(result3);
                    let allRec = new Array(4);
                    allRec[0] = {
                        ...result3[0],
                        important:1
                    };
                    for (let i =1;i<4;i++)
                    {
                        allRec[i] = result2[i-1];
                    }
                    console.log(allRec)
                res.send(allRec)
                })        
            })
                }
            }else{
        
            connection.query(`SELECT * FROM product WHERE FrontRear = '${placeFrontRear}' AND ProdN != '${lastProdN}' LIMIT 4`,(err2,result2)=>{
                if(err2) console.log(err2)
                console.log(result2)
            res.send (result2)
            })
        }}
    else {
        connection.query('SELECT *FROM product ORDER BY cost DESC Limit 4;',(err,result4)=>{
            if(err)console.log(err)

            res.send(result4)
        })
    }
    })
})

app.listen (4000,()=>{
    console.log('running on port 4000')
})