// scripts/testModels.js
import {  Product } from '../models/index';
import { connectDB } from '@/app/lib/db';
async function test() {
    await connectDB();
    const products = await Product.findAll();
    console.log(products);
}

test();