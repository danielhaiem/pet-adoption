// THIS IS JUST TO IMPORT DUMMY DATA. DELETE FILE BEFORE PRODUCTION!!!
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/UserDataSet';
import pets from './data/PetsDataSet';
import Users from './models/signUpModel';
import Pets from './models/addPetModel';
import connectDB from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Pets.deleteMany();
    await Users.deleteMany();

    const createdUser = await Users.insertMany(users);
    const adminUser = createdUser[0]._id;
    // const samplePets = pets.map(pet => {
    //   return { ...pet, user: adminUser}
    // })
    await Pets.insertMany(pets);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Pets.deleteMany();
    await Users.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
