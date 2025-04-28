const express=require('express');
const sql=require('mssql');
const cors=require('cors');

const app=express();
app.use(cors())
app.use(express.json());


const config={
    user:"node_user",
    password: "node_user1234",
    server:"localhost",
    database: "testproducts",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort:true,
        instancename:"SQLEXPRESS"
    },
    PORT:1433
}

//get

app.get('/Products',async(req,res)=>{
    try{
    const pool=await sql.connect(config);
    const data=pool.request().query('select * from Products');
    return res.json((await data).recordset)
}

catch(err)
{
    console.log(err);
}
})

app.get('/Users',async(req,res)=>{
    try{
    const pool=await sql.connect(config);
    const data=pool.request().query('select * from Users');
    return res.json((await data).recordset)
}

catch(err)
{
    console.log(err);
}
})


app.get('/Orders',async(req,res)=>{
    try{
    const pool=await sql.connect(config);
    const data=pool.request().query('select o.* from Orders o left join CanceledOrders c on o.id=c.id where c.id is NULL');
    return res.json((await data).recordset)
}

catch(err)
{
    console.log(err);
}
})

app.get('/CanceledOrders',async(req,res)=>{
    try{
    const pool=await sql.connect(config);
    const data=pool.request().query('select * from CanceledOrders');
    return res.json((await data).recordset)
}

catch(err)
{
    console.log(err);
}
})

//post orders
app.post('/Orders', async (req, res) => {
    const { id, userId, username, orderDate, items, total } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar(50), id)
            .input('userId', sql.NVarChar(50), userId)
            .input('username', sql.NVarChar(50), username)
            .input('orderDate', sql.DateTime, orderDate)
            .input('items', sql.NVarChar(sql.MAX),JSON.stringify(items))
            .input('total', sql.Decimal(10, 2), total)
            .query(`
                INSERT INTO Orders (id, userId, username, orderDate, items, total)
                VALUES (@id, @userId, @username, @orderDate, @items, @total)
            `);

        res.status(201).send('Order placed successfully');
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).send(err.message);
    }
});

// Post canceledOrders

app.post('/CanceledOrders', async (req, res) => {
    const { id, userId, username, orderDate, items, total } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar(50), id)
            .input('userId', sql.NVarChar(50), userId)
            .input('username', sql.NVarChar(50), username)
            .input('orderDate', sql.DateTime, orderDate)
            .input('items', sql.NVarChar(sql.MAX),JSON.stringify(items))
            .input('total', sql.Decimal(10, 2), total)
            .query(`
                INSERT INTO CanceledOrders (id, userId, username, orderDate, items, total)
                VALUES (@id, @userId, @username, @orderDate, @items, @total)
            `);

        res.status(201).send('Order moved to CanceledOrders');
    } catch (err) {
        console.error('Error moving order to CanceledOrder:', err);
        res.status(500).send(err.message);
    }
});




app.post('/Users', async (req, res) => {
    const { id, fullname, username, email, password } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar(50), id)
            .input('fullname', sql.NVarChar(50), fullname)
            .input('username', sql.NVarChar(50), username)
            .input('email', sql.NVarChar(50), email)
            .input('password', sql.NVarChar(50), password)
            .query(`
                INSERT INTO Users (id, fullname, username, email, password)
                VALUES (@id, @fullname, @username, @email, @password)
            `);

        res.status(201).send('User Created');
    } catch (err) {
        console.error('Error Creating User:', err);
        res.status(500).send(err.message);
    }
});


app.delete('/Orders/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id with deleting:', id)

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.NVarChar(50), id)
            .query('DELETE FROM Orders WHERE id = @id');

            if(result.rowsAffected[0]>0){
                res.status(200).send('Order Deleted successfully');

            } else {
                res.status(404).send('Order not found')
            }
                
            
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).send(err.message);
    }
});




app.get('/',(req,res) => {
    return res.json("hello from backend");
})

app.listen(3000,()=>{
    console.log("the server has started")
})



