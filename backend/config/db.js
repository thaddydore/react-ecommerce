import mongoose from 'mongoose';

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(`${process.env.MONGO_URIs}`, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
		});

		console.log(`Mongodb connected: ${connect.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDb;
