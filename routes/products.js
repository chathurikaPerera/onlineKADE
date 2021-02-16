const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res)=>{
    //api/v1/products?category=544454,7847857
    let filter = {};
    if(req.query.categories)
    {
        filter = {category:req.query.categories.split(',')};
    }
    const productList = await Product.find(filter).populate('category');

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

    if(!mongoose.isValidObjectId(req.params.id))
    {
        res.status(400).send('Invalid');
    }s

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
//delete product
router.delete('/:id', (req, res) =>{
    Product.findByIdAndRemove(req.params.id).then( product =>{
        if(product)
        {
            return res.status(200).json({success:true, message:"delete success"});
        }
        else{
            return res.status(404).json({success:false, message:"cateory not found"});
        }
    }).catch(err =>{
        return res.status(100).json({success:false, error:err});
    })
})

//statics
router.get('/get/count', async(req, res) => {
    const productCount = await Product.countDocuments((count) => count)
    if(!productCount){
        res.status(500).json({success: false});
    }
   res.send({
       count: productCount
   });
})

router.get('/get/featured/:count', async(req, res) => {
    const count = req.params.count ? req.params.count : 0 ;
    const products = await Product.find({isFeatured: true}).limit(+count);
    if(!products){
        res.status(500).json({success: false});
    }
   res.send(products)
})
//getting product by category using query parameters

module.exports = router;