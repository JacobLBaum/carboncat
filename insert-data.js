const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://leafweaf:Leafweaf1@carboncat.bfufj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
   try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("people");
        // Construct a document                                                                                                                                                              
        let personDocument = {
            "name": { "first": "Jacob", "last": "Baum" },
            "birth": new Date(2000, 6, 20), // May 23, 1912                                                                                                                                 
            "death": new Date(2025, 5, 7),  // May 7, 1954                                                                                                                                  
            "contribs": [ "CarbonCat", "BAMF"],
            "views": 20000
        }
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne({"views": 20000});
        // Print to the console
        console.log(myDoc);
       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
   }
}

run().catch(console.dir);
