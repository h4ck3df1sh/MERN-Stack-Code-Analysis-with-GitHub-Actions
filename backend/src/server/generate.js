import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import { countriesData } from './countriesData.js';
import userModel from '../api/models/userSchema.js';
import countryModel from '../api/models/countrySchema.js';
import postModel from '../api/models/postSchema.js';
import commentModel from '../api/models/commentSchema.js';

const images = [
  'https://picsum.photos/id/28/367/267',
  'https://picsum.photos/id/29/4000/2670',
  'https://picsum.photos/id/25/5000/3333',
  'https://picsum.photos/id/27/3264/1836',
  'https://picsum.photos/id/24/4855/1803',
  'https://picsum.photos/id/26/4209/2769',
  'https://picsum.photos/id/23/3887/4899',
  'https://picsum.photos/id/22/4434/3729',
  'https://picsum.photos/id/21/3008/2008',
  'https://picsum.photos/id/20/367/267',
  'https://picsum.photos/id/19/2500/1667',
  'https://picsum.photos/id/18/2500/1667',
  'https://picsum.photos/id/17/2500/1667',
  'https://picsum.photos/id/16/2500/1667',
  'https://picsum.photos/id/15/2500/1667',
  'https://picsum.photos/id/14/2500/1667',
  'https://picsum.photos/id/13/2500/1667',
  'https://picsum.photos/id/12/2500/1667',
  'https://picsum.photos/id/11/2500/1667',
  'https://picsum.photos/id/10/2500/1667',
  'https://picsum.photos/id/9/5000/3269',
];

const hobbies = ['Playing video games', 'Watching movies', 'Watching TV shows', 'Listening to music', 'Dancing', 'Singing', 'Playing board games', 'Playing card games', 'Playing chess', 'Playing poker', 'Playing sports', 'Running', 'Jogging', 'Swimming', 'Yoga', 'Pilates', 'Martial arts', 'Cycling', 'Rollerblading', 'Skateboarding', 'Snowboarding', 'Skiing', 'Surfing the internet', 'Socializing with friends', 'Traveling', 'Collecting stamps', 'Collecting coins', 'Collecting antiques', 'Reading comics', 'Playing with pets'];

const avatars = [
  "https://reqres.in/img/faces/1-image.jpg",
  "https://reqres.in/img/faces/2-image.jpg",
  "https://reqres.in/img/faces/3-image.jpg",
  "https://reqres.in/img/faces/4-image.jpg",
  "https://reqres.in/img/faces/5-image.jpg",
  "https://reqres.in/img/faces/6-image.jpg",
  "https://reqres.in/img/faces/7-image.jpg",
  "https://reqres.in/img/faces/8-image.jpg",
  "https://reqres.in/img/faces/9-image.jpg",
  "https://reqres.in/img/faces/10-image.jpg",
  "https://reqres.in/img/faces/11-image.jpg",
  "https://reqres.in/img/faces/12-image.jpg",
]

export async function addCountries() {
  for (let country of countriesData) {
    await countryModel.create(country);
  }
}

export async function emptyVisitors() {
  const countries = await countryModel.find();
  for (let country of countries) {
    country.visitors = [];
    await country.save();
  }
}

export async function generateUsers() {
  const countries = await countryModel.find();

  for (let i = 0; i < 1000; i++) {
    const randomCountry = faker.helpers.arrayElement(countries);
    const randomCountry2 = faker.helpers.arrayElement(countries);
    const randomPW = '123456';
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto.pbkdf2Sync(randomPW, salt, 310000, 32, 'sha256').toString('hex');

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const nationality = randomCountry.country;
    const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
    const birthdate = faker.date.between('1950-01-01', '2005-12-31');
    const country = randomCountry._id;
    const followers = [];
    const followed = [];
    const likedPosts = [];
    const comments = [];
    const avatar = faker.helpers.arrayElement(avatars);
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const role = 'client';
    const prefLocation = randomCountry2.country;
    const profession = faker.name.jobTitle();
    const visited = [];
    const hobby = faker.helpers.arrayElement(hobbies);
    const hobby2 = faker.helpers.arrayElement(hobbies);
    const bio = faker.lorem.sentences();
    const location = randomCountry.country;
    const website = `https://www.website.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const facebook = `https://www.facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const twitter = `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const instagram = `https://www.instagram.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const linkedin = `https://www.linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const github = `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      nationality,
      gender,
      birthdate,
      country,
      followers,
      followed,
      likedPosts,
      comments,
      avatar,
      username,
      salt,
      role,
      prefLocation,
      profession,
      visited,
      hobby,
      hobby2,
      bio,
      location,
      website,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
    };

    await userModel.create(newUser);
  }
}

export async function generatePosts() {
  const authors = await userModel.find();

  for (let i = 0; i < 250; i++) {
    const randomAuthor = faker.helpers.arrayElement(authors);

    const title = faker.lorem.sentences();
    const content = faker.lorem.paragraph();
    const author = randomAuthor._id;;
    const likes = [];
    const comments = [];
    const imagePost = [faker.helpers.arrayElement(images)];
    const sentiment = 5;

    const newPost = {
      title,
      content,
      author,
      likes,
      comments,
      imagePost,
      sentiment,
    }

    await postModel.create(newPost)
  }
}

export async function generateComments() {
  const authors = await userModel.find();
  const posts = await postModel.find();

  for (let i = 0; i < 1000; i++) {
    const randomAuthor = faker.helpers.arrayElement(authors);
    const randomPost = faker.helpers.arrayElement(posts);

    const content = faker.lorem.paragraph();
    const author = randomAuthor._id;
    const post = randomPost._id;
    const likes = [];
    const comments = [];

    const newComment = {
      content,
      author,
      post,
      likes,
      comments,
    }

    const comm = await commentModel.create(newComment);
    await postModel.findOneAndUpdate({ _id: randomPost._id }, { $push: { 'comments': comm._id } });
  }
}

export async function addVisitors() {
  const countries = await countryModel.find();
  const users = await userModel.find();

  for (let i = 0; i < 1000; i++) {
    const randomCity = faker.helpers.arrayElement(countries);
    const randomUser = faker.helpers.arrayElement(users);

    randomCity.visitors.push(randomUser);
    randomUser.visited.push(randomCity);
    await randomCity.save();
    await randomUser.save();
  }
}

export async function changeImages() {
  const posts = await postModel.find();
  for (let post of posts) {
    post.imagePost = [faker.helpers.arrayElement(images)]
    await post.save();
  }
}