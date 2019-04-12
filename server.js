const express = require('express')
const {
    db,
    Vendor,
    Product,
    User,
    Cart
} = require('./db')
const app = express();


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/',
    express.static(__dirname + '/public')
)

app.get('/vendors', async (req, res) => {
    console.log("hello")
    const vendors = await Vendor.findAll()
    res.send(vendors)

})

app.post('/vendors', async (req, res) => {

    console.log(req.body)
    try {
        const result = await Vendor.create({
            Name: req.body.name
        })
        res.send({ success: true })
    }

    catch (e) {
        res.send({ success: false, err: e.message })
    }
})

app.delete('/vendors/:id', async function (req, res) {
    try {
        Vendor.destroy({
            where:
            {
                id: req.params.id
            },
        })
        try {
            Product.destroy({
                where: {
                    VendorId: null
                }
            })
        }
        catch (e) {
            console.log(e.message);
        }
        res.send({ success: true })
    }
    catch (e) {
        res.send({ success: false, err: e.message })
    }
})




//-----------------------------------------------------------

app.get('/product', async (req, res) => {

    const products = await Product.findAll()
    res.send(products)
})

app.post('/product', async (req, res) => {

    try {
        const result = await Product.create({
            Name: req.body.name,
            Price: req.body.price
        })
        res.send({ success: true })
    }
    catch (e) {
        console.error(e)
        res.send({ success: false, err: e.message })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        Product.destroy({
            where: {
                id: req.params.id
            }

        })
        res.send({ success: true })
    }
    catch (e) {
        res.send({ success: false, err: e.message })
    }

})

//------------------------------------------------
app.post('/user', async (req, res) => {


    const preUser = await User.findOne({
        where: {
            Name: req.body.name
        }
    })
    let result;

    if (!preUser) {
        try {
            result = await User.create({
                Name: req.body.name
            })
            res.send(result)
        }
        catch (e) {
            res.send({ success: false, err: e.message })
        }
    }
    res.send(preUser)
})


//--------------------------cart---------------------------------

app.post('/additem',async(req , req)=>{
    try{
        const userpre= await Cart.findOne({
            where:{
                UserId:req.body.uid,
                ProductId:req.body.proid
            }
        })
        if(!userpre){

            try{
                
            }

        }
        else{

        }
    }
    catch(e){

    }
})


db.sync()
    .then(() => {
        app.listen(8988)
    })