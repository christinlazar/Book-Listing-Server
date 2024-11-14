const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bookModel = require('../model/bookModel')
const registerUser = async (req,res) =>{
    try {
       const fdata = req.body.formData
       const existingUser = await User.findOne({email:fdata.email})
       if(existingUser){
        return res.json({success:false,message:"Regsitered failed"})
       }
       const hashedPassword = await bcrypt.hash(fdata.password,10)
       const userData =  {
        name:fdata.name,
        email:fdata.email,
        password:hashedPassword
       }
 
       await User.create(userData)
       return res.status(200).json({success:true,message:"Regsitered succesfully"})

    } catch (error) {
        console.error(error)
    }
}

const userLogin = async (req,res) =>{
    try {
        const email = req.body?.formData?.email
        const password = req.body?.formData.password
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
            if(isPasswordCorrect){
                const jwtSecretKey = process.env.JWT_SECRET_KEY 
                console.log("jwtkey",jwtSecretKey)
                const accessToken =  jwt.sign({id:existingUser._id},jwtSecretKey,{expiresIn:'7d'})
                return res.status(200).json({success:true,accessToken})
            }else{
                return res.json({password:false,message:"Wrong password"})
            }
        }else{
            return res.status(401).json({registered:false,message:"Not registered"})
        }
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

const addBook = async (req,res) =>{
    try {
        const bookData = req.body.bookData
        const token = req.headers.authorization.split(' ')[1]
        const secretKey = process.env.JWT_SECRET_KEY 
        const verifiedToken =  jwt.verify(token,secretKey)
        const existingBook = await bookModel.findOne({title:bookData.title})
        if(existingBook){
            return res.json({existing:true})
        }
        if(verifiedToken){
            const userId = verifiedToken.id
            const bookD = {
                userId ,
                title:bookData.title,
                author:bookData.author,
                description:bookData.description
            }
            await bookModel.create(bookD)
            return res.status(200).json({success:true})
        }


    } catch (error) {
        console.error(error)
    }
}

const getAllBooks = async (req,res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const secretKey = process.env.JWT_SECRET_KEY
        const verified = jwt.verify(token,secretKey)
        if(verified){
            const books = await bookModel.find({userId:verified.id})
            console.log("books",books)
            return res.status(200).json({success:true,books})
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteBook = async (req,res) =>{
    try {
         const bookId = req.body.bookId
         await bookModel.findOneAndDelete({_id:bookId})
         return res.status(200).json({success:true})
    } catch (error) {
        console.error(error)
    }
}

module.exports = {registerUser,userLogin,addBook,getAllBooks,deleteBook}