const { MongoClient, ServerApiVersion } = require('mongodb');
console.log("Attempting connection");
// Replace the following with your Atlas connection string                                                                                                                                        
const uri = "mongodb+srv://leafweaf:Leafweaf1@carboncat.bfufj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect(err => {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
        });
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        console.log('closing')
        await client.close();
    }
}

run().catch(console.dir);
