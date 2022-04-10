const mongoose = require('mongoose')

const connectToDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectToDB;