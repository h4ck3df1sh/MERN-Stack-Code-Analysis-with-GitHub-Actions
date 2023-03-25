import * as usersRepository from "../repository/usersRepository.js";
import crypto from 'crypto';

export async function getUserById({ id }) {
  const getUser = await usersRepository.getUserById({ id });
  return getUser;
}

export async function updateUserById({ id, updateData }) {
  if (updateData.password) {
    updateData.salt = crypto.randomBytes(16).toString('hex');
    updateData.password = crypto.pbkdf2Sync(updateData.password, updateData.salt, 310000, 32, 'sha256').toString('hex');
  }
  const updatedUser = await usersRepository.updateUserById({ id, updateData });
  return updatedUser;
}

export async function deleteUserById(id) {
  const deletedUser = await usersRepository.deleteUserById(id);
  return deletedUser;
}

export async function getAllUsers(query) {
  const users = await usersRepository.getAllUsers(query);
  return users;
}

export async function getUserByToken(query, params) {
  const user = await usersRepository.getUserByToken(query, params);
  return user;
}

export async function followUserById(actionUser, affectUser) {
  if (actionUser == affectUser) throw new Error("Can't follow itself");
  await usersRepository.getUserById({ id: actionUser });
  await usersRepository.getUserById({ id: affectUser });
  const addedFollower = await usersRepository.addFollower(actionUser, affectUser);
  const addedFollowed = await usersRepository.addFollowed(actionUser, affectUser);
  return { addedFollower, addedFollowed };
}
export async function updateAvatar(user, image) {
  const avatar = await usersRepository.updateAvatar(user, image);
  console.log(avatar)
  return avatar;
}
export async function unfollowUserById(actionUser, affectUser) {
  await usersRepository.getUserById({ id: actionUser });
  await usersRepository.getUserById({ id: affectUser });
  const removedFollower = await usersRepository.removeFollower(actionUser, affectUser);
  const removedFollowed = await usersRepository.removeFollowed(actionUser, affectUser);
  return { removedFollower, removedFollowed };
}
 