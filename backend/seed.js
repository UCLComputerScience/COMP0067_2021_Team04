// seed function to populate the database with information
const axios = require('axios');
const { addOrUpdateItem } = require('./dynamoFunctions');

const seedData = async () => {
    const url = 'http://hp-api.herokuapp.com/api/characters';
    try {
        const { data: characters } = await axios.get(url);
        const characterPromises = characters.map((character, i) =>
            addOrUpdateItem({ ...character, userID: i + '' })
        );
        await Promise.all(characterPromises);
    } catch (err) {
        console.log(err);
        console.log('AHHHHHHH')
    }
};

// make a request to harry potter api and transform it and save into database
seedData();