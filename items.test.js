process.env.NODE_ENV ="test";

const request = require("supertest");
const app =require("./app");
let items = require("./fakeDb");

let pickles = [{name: "Pickles", price: 1.30},{name: "Ham", price: 4.90}]

beforeEach(function(){
    for (let item of pickles) {
        items.push(item);
}});

afterEach(function(){
    items.length=0;
});

describe("GET / items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        console.log(res.body);

    })
})

describe("POST / items", () => {
    test("Post an item", async () => {
        const newItem = await request(app).post("/items").send({name: "chips", price: 2.49});
        expect(newItem.statusCode).toBe(201)
        expect(newItem.body).toEqual({newItem: {name: "chips", price: 2.49}});

    })
})

describe("Patch /items", () => {
    test("Updating Ham", async () => {
        const itemName = pickles[1].name;
        const res = await request(app)
          .patch(`/items/${itemName}`)
          .send({ name: "corn chips", price: 3.90 });
    
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual( { item: "corn chips"} );
    
        const updatedItem = items.find((item) => item.name === itemName);
        expect(updatedItem).toEqual({ name: "corn chips", price: 3.90 });


    })
})