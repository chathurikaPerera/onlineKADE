const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{
    const productList = await Product.find();//.populate(category);

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

//get single product
router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);//.populate('category');
    if(!product)
    {
        res.status(500).json({message: "not found"});
    }
    res.status(200).send(product);

})

router.post(`/`, async(req, res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category');

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    //add to the database
    product = await product.save();
    if(!product)
    {
        return res.status(500).send("the product cannot be created");
    }
    res.send(product);
})

//update product
router.put('/:id', async(req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {new: true}
    )
    if(!product){
        res.status(500).json({message: "not found"});
    }
    res.status(200).send(product);
})

module.exports = router;