import * as usersRepository from "../repository/usersRepository.js";
import crypto from 'crypto';

export async function getUserById({ id }) {
  const getUser = await usersRepository.getUserById({ id });
  return getUser;
}

export async function updateUserById({ id, updateData, avatar }) {
  if (updateData.password) {
    updateData.salt = crypto.randomBytes(16).toString('hex');
    updateData.password = crypto.pbkdf2Sync(updateData.password, updateData.salt, 310000, 32, 'sha256').toString('hex');
  }
  const updatedUser = await usersRepository.updateUserById({ id, updateData, avatar });
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

export async function toggleFollowByUserId(actionUser, affectUser) {
  const followedUser = await usersRepository.toggleFollowByUserId(actionUser, affectUser);
  return followedUser;
}
export async function visitedCountryByUserId(userId,countryId) {
  const user = await usersRepository.visitedCountryByUserId(userId,countryId);

  return user;
}

export async function UserByQuery(query){
  const user = await usersRepository.UserByQuery(query);
  return user;
}

export async function updateAvatar(user, image){
  const avatar = await usersRepository.updateAvatar(user, image);
  return avatar;
}

export async function getUserComments(userId) {
  const getComments = await usersRepository.getUserComments(userId);
  return getComments;
}