import userModel from '../models/userSchema.js';
import { Types } from 'mongoose';
const { ObjectId } = Types;

export async function getUser(query) {
  const response = await userModel.findOne(query);
  return response;
}

export async function createUser(body) {
  const response = await userModel.create(body);
  return response;
}

export async function getUserById({ id }) {
  const user = await userModel.findOne({ _id: id }).
    populate('followed').
    populate('followers').
    populate('likedPosts').
    populate('visited').
    select('-password -salt').
    exec();
  await user.populate({ path: 'likedPosts.author', model: 'User' });
  if (!user) throw new Error('User not found.');
  return user;
}

export async function updateUserById({ id, updateData, avatar }) {
  console.log(id)
  if (avatar) updateData.avatar = avatar;
  console.log(updateData)
  const currentUser = await userModel.findOne({ _id: id }).select('-password -salt').exec();
  if (!currentUser) throw new Error('User not found.');
  const updatedUser = await userModel.findOneAndUpdate({ _id: id }, updateData, { new: true }).
    populate('visited').select('-password -salt').
    exec();
  return updatedUser;
}

export async function deleteUserById({ id }) {
  const deletedUser = await userModel.findOneAndDelete({ _id: id }).select('-password -salt').exec();
  if (!deletedUser) throw new Error('User not found.');
  //DELETE ALL COMMENTS OR POSTS
  return deletedUser;
}

export async function getAllUsers(query) {
  const users = await userModel.find(query).select('-password -salt').exec();
  if (!users) throw new Error('No users found.');
  return users;
}

export async function updateAvatar(user, image) {
  const avatar = await userModel.findOneAndUpdate({ _id: user }, { $set: { avatar: image } }, { new: true }).populate('visited').select('-password -salt').exec();
  return avatar;
}


export async function getUserByToken(query, params) {
  const { populateFollowers, populateFollowed, populateLikedPosts, visited } = params;
  const users = await userModel.findOne(query).select('-password -salt').exec();
  if (populateFollowers == 'true') await users.populate('followers');
  if (populateFollowed == 'true') await users.populate('followed');
  if (populateLikedPosts == 'true') {
    await users.populate('likedPosts');
    await users.populate({ path: 'likedPosts.author', model: 'User' });
  }
  if (visited == 'true') await users.populate('visited');
  if (!users) throw new Error('No users found.');
  return users;
}

export async function toggleFollowByUserId(actionUser, affectUser) {
  const userFollowing = await userModel.findOne({ _id: actionUser });
  const userFollowed = await userModel.findOne({ _id: affectUser });
  if (userFollowing.followed.includes(affectUser)) {
    userFollowing.followed.splice(userFollowing.followed.indexOf(affectUser), 1);
    userFollowed.followers.splice(userFollowed.followers.indexOf(actionUser), 1);
  } else {
    userFollowing.followed.push(affectUser);
    userFollowed.followers.push(actionUser);
  }
  await userFollowing.save();
  await userFollowed.save();
  await userFollowed.populate('followers')
  await userFollowed.populate('followed')
  await userFollowed.populate('likedPosts')
  await userFollowed.populate('visited')
  return userFollowed;
}
export async function visitedCountryByUserId(userId, countryId) {
  const userFound = await userModel.findOne({ _id: new ObjectId(userId) });
  const visitedCountry = userFound.visited.some(visit => String(visit) === countryId);

  if (visitedCountry) {
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { visited: countryId } },
      { new: true }
    ).populate('visited').exec();
    if (!user) throw new Error('User not found.');
    return user;
  }
  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    { $push: { visited: countryId } },
    { new: true }
  )
  if (!user) throw new Error('User not found.');
  const fullUser = await userModel.findOne({ _id: new ObjectId(userId) }).populate('visited').exec();
  fullUser.save();
  return fullUser;


}

export async function UserByQuery(querys) {
  const pipeline = [
    {
      $search: {
        index: "SearchUsers",
        autocomplete: {
          query: querys,
          path: "firstName",
          fuzzy: {
            maxEdits: 1,
          }
        }
      }
    },
    {
      $limit: 5
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        avatar: 1
      }
    }
  ]
  const response = await userModel.aggregate(pipeline);
  return response;
}

export async function getUserComments(userId) {
  const getComments = await commentModel.find({ author: userId }).populate('author').populate('post').exec();
  return getComments;
}