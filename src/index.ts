import express from "express";
import cors from 'cors' ;
import authRoutes from './routers/auth' ; 
import userRoutes from './routers/user' ;
import productRoutes from './routers/product' ; 
import categoryRoutes from './routers/category' ; 
import cartRoutes from './routers/cart' ; 
import collectionRoutes from './routers/collections'

const app = express() ; 
const port = 3000 ; 

app.use(cors()) ;
app.use(express.json()) ; 

app.use('/auth' , authRoutes) ; // done 
app.use('/user' , userRoutes) ; //done
app.use('/product' , productRoutes) ; 
app.use('/category' , categoryRoutes) ; // done 
app.use('/cart' , cartRoutes) ; 
app.use('/collections' , collectionRoutes) ; 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})