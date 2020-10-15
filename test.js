const chai = require('chai')
const {expect} = require('chai')
const {to} = require('await-to-js')
const app = require('./app')
chai.use(require('chai-http'))

describe('E-commerce', ()=>{
    describe('Products', ()=>{
        it('should return all products list', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/products'))

            result = result.body;
            console.log(result)
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            for(let prod of result.data){
                expect(prod).to.have.property('id').which.a('number')
                expect(prod).to.have.property('name').which.a('string')
                expect(prod).to.have.property('details').which.a('string')
                expect(prod).to.have.property('category_id').which.a('number')
            }
        })

        it('should return product with given product_id', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/products/5'))

            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            expect(result.data).length(1)
            expect(result.data[0]).to.have.property('id').which.a('number')
            expect(result.data[0]).to.have.property('name').which.a('string')
            expect(result.data[0]).to.have.property('details').which.a('string')
            expect(result.data[0]).to.have.property('category_id').which.a('number')
        })

        it('should return products with given category_id', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/products/inCategory/2'))

            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            for(let prod of result.data){
                expect(prod).to.have.property('id').which.a('number')
                expect(prod).to.have.property('name').which.a('string')
                expect(prod).to.have.property('details').which.a('string')
                expect(prod).to.have.property('category_id').which.a('number')
            }
        })

        it('should add a new product', async ()=>{
            let prod = {
                'name': 'test-prod',
                'details': 'product for testing',
                'price': 62,
                'category_id':2
            }
            let err, result
            [err, result] = await to(chai.request(app).post('/products').send(prod))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
        })
    })

    describe('Customers', ()=>{
        it('should sign up new customer', async ()=>{
            let cust = {
                username: "test-cust",
                name: "customer for testing",
                email: "cust@test.com",
                phone: "9638527410",
                password: "testpswd",
            }
            let err, result
            [err, result] = await to(chai.request(app).post('/customer').send(cust))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            console.log(result.data)
        })

        it('should log in customer', async ()=>{
            let cust = {
                username: "test-cust",
                password: "testpswd"
            }
            let err, result
            [err, result] = await to(chai.request(app).post('/customer/login').send(cust))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            console.log(result.data)
        })

        it('should show customer details', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/customer')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg"))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            expect(result.data['customer details']).length(1)
            expect(result.data['customer details'][0]).to.have.property('username').which.a('string')
            expect(result.data['customer details'][0]).to.have.property('name').which.a('string')
            expect(result.data['customer details'][0]).to.have.property('email').which.a('string')
            expect(result.data['customer details'][0]).to.have.property('phone').which.a('number')
        })

        it('should update customer\'s address', async ()=>{
            let add = {
                address: "test-address"
            }
            let err, result
            [err, result] = await to(chai.request(app).put('/customer/address')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(add))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)

        })

        it('should update customer\'s creditCard', async ()=>{
            let cc = {
                creditCard: 1234567890123456
            }
            let err, result
            [err, result] = await to(chai.request(app).put('/customer/creditCard')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(cc))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)

        })
    })

    describe('Orders', ()=>{
        it('should get all orders by a Customer', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/orders')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg"))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            for (let order of result.data){
                expect(order).to.have.property('id').which.a('number')
                expect(order).to.have.property('product_id').which.a('number')
                expect(order).to.have.property('qty').which.a('number')
                expect(order).to.have.property('customer').which.a('string')
            }
        })

        it('should post a new order', async ()=>{
            let order = {
                "product_id": 3,
                "qty": 8
            }
            let err, result
            [err, result] = await to(chai.request(app).post('/orders')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(order))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
        })
    })

    describe('Shopping Cart', ()=>{
        it('should view all cart items', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/shoppingCart')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg"))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            for (let order of result.data){
                expect(order).to.have.property('id').which.a('number')
                expect(order).to.have.property('product_id').which.a('number')
                expect(order).to.have.property('qty').which.a('number')
                expect(order).to.have.property('customer').which.a('string')
            }
        })

        it('should add a product to the cart', async ()=>{
            let order = {
                "product_id": 1,
                "qty": 10
            }
            let err, result
            [err, result] = await to(chai.request(app).post('/shoppingCart/add')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(order))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
        })

        it('should update qty', async ()=>{
            let order = {
                "product_id": 5,
                "qty": 7
            }
            let err, result
            [err, result] = await to(chai.request(app).put('/shoppingCart/qty')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(order))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
        })

        it('should remove a product from cart', async ()=>{
            let prod = {
                "product_id": 1
            }
            let err, result
            [err, result] = await to(chai.request(app).delete('/shoppingCart/removeProduct')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg")
                .send(prod))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
        })

        it('should get total amount of cart', async ()=>{
            let err, result
            [err, result] = await to(chai.request(app).get('/shoppingCart/totalAmount')
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg"))
            result = result.body;
            expect(result).to.be.a('object')
            expect(result).to.have.property('data')
            expect(result).to.have.property('error').which.equals(null)
            expect(result.data).to.have.property('message').which.a('string')
        })

        // it('should place order for all cart items', async ()=>{
        //     let err, result
        //     [err, result] = await to(chai.request(app).post('/shoppingCart/checkout')
        //         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtY3VzdCIsImVuY3J5cHRlZFBhc3N3b3JkIjoiJDJiJDEwJDNITFFjRHNBZ0xTeXYySC5ZdWhpTGUwT0pOM2lIVkF1eS5rbDRITWIySHBINkdacnhLL1ZTIiwiaWF0IjoxNjAyNzUxMjU5LCJleHAiOjE2MDI3NTQyNTl9.x6mgBO9jh7R_P5s_3UO8x5T1ENufjshzDRHjMQscYQg"))
        //     result = result.body;
        //     expect(result).to.be.a('object')
        //     expect(result).to.have.property('data')
        //     expect(result).to.have.property('error').which.equals(null)
        // })
    })
})