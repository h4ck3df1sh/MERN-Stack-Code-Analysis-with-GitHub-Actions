import userModel from '../models/userSchema.js';

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
    select('-password -salt').
    exec();
  if (!user) throw new Error('User not found.');
  return user;
}

export async function updateUserById({ id, updateData }) {
  const currentUser = await userModel.findOne({ _id: id }).select('-password -salt').exec();
  if (!currentUser) throw new Error('User not found.');
  const updatedUser = await userModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
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
  const avatar = await userModel.findOneAndUpdate({ _id: user }, { $set: { avatar: image } }, { new: true }).select('-password -salt').exec();
  return avatar;
}


export async function getUserByToken(query, params) {
  const { populateFollowers, populateFollowed, populateLikedPosts } = params;
  const users = await userModel.findOne(query).select('-password -salt').exec();
  if (populateFollowers == 'true') await users.populate('followers');
  if (populateFollowed == 'true') await users.populate('followed');
  if (populateLikedPosts == 'true') await users.populate('likedPosts');
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
  return userFollowed;
}
export async function visitedCountryByUserId(userId, countryId) {
  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    { $push: { visited: countryId } },
    { new: true }
    );
    if (!user) throw new Error('User not found.');
    return user;
    

}