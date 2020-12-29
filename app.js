const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDataBase', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    // we're connected!
    // creating schema - like a class/blueprint for a document in a collection
    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Why no Name for the fruit?']
        },
        score: {
            type: Number,
            min: 0,
            max: 10
        },
        review: String
    });

    //acutally creating the class - compiling our schema into a model
    /**
     * @param
     * fruit - name of the collection, singular
     */
    const Fruit = mongoose.model("fruit", fruitSchema);

    const fruit = new Fruit({
        score: 9,
        review: 'Awesome Apple!'
    });

    // fruit.save();

    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favoriteFruit: fruitSchema
    });

    const Person = mongoose.model("Person", personSchema);

    // const person = new Person({
    //     name: 'John',
    //     age: 37
    // });

    const pinapple = new Fruit({
        name: "Pinapple",
        score: 5,
        review: "Too ripe :( betch!"
    });

    pinapple.save();

    const strawberry = new Fruit({
        name: "Strawberry",
        score: 9,
        review: "lIpZZ!"
    });

    strawberry.save();

    Person.updateOne({_id: "5feb5acc3e9f60f0d5eca003"}, {favoriteFruit: strawberry}, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Successful Update!");
        }
    });

    const person = new Person({
        name: 'Amy',
        age: 12,
        favoriteFruit: pinapple
    });

    //person.save();

    const orange = new Fruit({
        name: 'Orange',
        score: 9,
        review: 'Really nice!'
    });

    const banana = new Fruit({
        name: 'Banana',
        score: 10,
        review: 'Healthy'
    });

    const grapes = new Fruit({
        name: 'Grapes',
        score: 10,
        review: 'Nice and Ripe!'
    });

    // Fruit.insertMany([orange, banana, grapes], function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Successfully added fruits to the Fruit database!");
    //     }
    // });

    Fruit.find(function(err, fruits) {
        if (err) {
            console.log(err);
        } else {
            fruits.forEach(element => {
                console.log(element.name);
            });

            mongoose.connection.close();
        }
    })

    //Update!
    // Fruit.updateMany({_id: "5feae56838611cedd6bf06ee"}, {score: 6, review: "This is good!"},
    //     function(err) {
    //         if(err) {
    //             console.log(err)
    //         } else {
    //             console.log("Success!")
    //         }
    //     }
    // );

    //DeleteOne!
    // Fruit.deleteOne({_id: "5feae56838611cedd6bf06ee"}, function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Successful delete!");
    //     }
    // })


    //DeleteMany
    // Person.deleteMany({name: "John"}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Delete Success!")
    //     }
    // });


});