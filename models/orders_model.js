const db=require('../database');

const orders={
    accCart(username,payment_method, callback){
        return db.query("INSERT INTO cart(username, payment_method) VALUES(?,?)",
        [
            username,
            payment_method
        ],callback);
    },
    addProducstToCart(newC,callback){
        return db.query("INSERT INTO orders(id_cart, id_products,amount) VALUES(?,?,?)",
            [
                newC.id_cart,
                newC.id_products,
                newC.amount
            ]
            ,callback);
    },
    getOrderData(id_cart,callback){
        return db.query("SELECT DISTINCT customers.username, name,orders.amount, cart.idcart FROM customers INNER JOIN cart ON customers.username=cart.username INNER JOIN orders ON cart.idcart=orders.id_cart INNER JOIN products ON orders.id_products=products.id_products WHERE cart.idcart=?",[id_cart],callback);
    }
}

module.exports=orders;