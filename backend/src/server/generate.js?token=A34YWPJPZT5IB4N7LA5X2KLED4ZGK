import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import userModel from '../api/models/userSchema.js';
import cityModel from '../api/models/citySchema.js';
import postModel from '../api/models/postSchema.js';
import commentModel from '../api/models/commentSchema.js';

const images = [
  'https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/02/25/17/56/cat-649164_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736875_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg',
  'https://cdn.pixabay.com/photo/2018/05/08/08/44/cat-3382099_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323231_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/09/12/13/14/cat-2749844_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/06/19/21/24/the-paparazzi-815478_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-297656_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/07/24/19/57/lion-2535886_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/06/17/23/46/cat-2417366_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/03/29/09/59/cat-2184682_960_720.jpg'
];

export async function generateCities() {

  const cities = [
    { cityName: 'Tokyo', country: 'Japan' },
    { cityName: 'New York City', country: 'United States' },
    { cityName: 'Mumbai', country: 'India' },
    { cityName: 'Beijing', country: 'China' },
    { cityName: 'Istanbul', country: 'Turkey' },
    { cityName: 'London', country: 'United Kingdom' },
    { cityName: 'Sao Paulo', country: 'Brazil' },
    { cityName: 'Moscow', country: 'Russia' },
    { cityName: 'Lagos', country: 'Nigeria' },
    { cityName: 'Mexico City', country: 'Mexico' }
  ];

  for (let i = 0; i < 10; i++) {
    const cityName = cities[i].cityName;
    const country = cities[i].country;
    const survey = [];
    const visited = [];
    const image = [];

    const newCity = {
      cityName,
      country,
      survey,
      visited,
      image,
    }

    await cityModel.create(newCity);
  }
}

export async function generateUsers() {
  const cities = await cityModel.find();

  for (let i = 0; i < 1000; i++) {
    const randomCity = faker.helpers.arrayElement(cities)
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const nationality = randomCity.country;
    const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
    const birthdate = faker.date.between('1950-01-01', '2005-12-31');
    const city = randomCity._id;
    const followers = [];
    const followed = [];
    const likedPosts = [];
    const comments = [];
    const avatar = faker.helpers.arrayElement(images);
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const role = 'client';
    const prefLocation = faker.address.country();
    const profession = faker.name.jobTitle();
    const hobby = faker.helpers.arrayElement(['Reading', 'Traveling', 'Hiking', 'Cooking', 'Sports', 'Music']);
    const hobby2 = faker.helpers.arrayElement(['Reading', 'Traveling', 'Hiking', 'Cooking', 'Sports', 'Music']);
    const bio = faker.lorem.sentences();
    const location = `${randomCity.cityName}, ${randomCity.country}`;
    const website = `https://www.website.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const facebook = `https://www.facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const twitter = `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const instagram = `https://www.instagram.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const linkedin = `https://www.linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const github = `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const salt = crypto.randomBytes(16).toString('hex');
    const randomPW = '123456';
    const password = crypto.pbkdf2Sync(randomPW, salt, 310000, 32, 'sha256').toString('hex');

    const newUser = {
      firstName,
      lastName,
      email,
      nationality,
      gender,
      birthdate,
      city,
      followers,
      followed,
      likedPosts,
      comments,
      avatar,
      username,
      role,
      prefLocation,
      profession,
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
      salt,
      password,
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

    const newPost = {
      title,
      content,
      author,
      likes,
      comments,
      imagePost,
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