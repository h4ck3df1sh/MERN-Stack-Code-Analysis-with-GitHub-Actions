import * as usersLogic from '../logic/usersLogic.js';
import { validateUser } from '../validation/validate.js';

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[a-f\d]{24}$/i)) return res.status(400).json('Missing or invalid ID format.');
    const user = await usersLogic.getUserById({ id });
    return res.json(user);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const avatar = req.file?.path;
    console.log(req.file?.path)
    if (!id || !id.match(/^[a-f\d]{24}$/i)) return res.status(400).json('Missing or invalid ID format.');
    const updateData = validateUser.update(req.body);
    const updatedUser = await usersLogic.updateUserById({ id, updateData, avatar });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function updateUserAvatarById(req, res) {
  const user = req.user._id;
  const image = req.file?.path;
  if (!user) return res.status(401).json('Unauthorized');
  try {
    const updateAvatar =  await usersLogic.updateAvatar(user, image);
    return res.json(updateAvatar);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[a-f\d]{24}$/i)) return res.status(400).json('Missing or invalid ID format.');
    const deletedUser = await usersLogic.deleteUserById({ id });
    return res.json(deletedUser);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function getAllUsers(req, res) {
  try {
    const query = req.query;
    const users = await usersLogic.getAllUsers(query);
    return res.json(users);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function getUserByToken(req, res) {
  try {
    const query = { _id: req.user._id }
    const { populateFollowers, populateFollowed, populateLikedPosts, visited } = req.query;
    const user = await usersLogic.getUserByToken(query, { populateFollowers, populateFollowed, populateLikedPosts, visited});
    return res.json(user);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function toggleFollowByUserId(req, res) {
  try {
    const { id: affectUser } = req.params;
    if (!affectUser || !affectUser.match(/^[a-f\d]{24}$/i)) return res.status(400).json('Missing or invalid ID format.');
    const actionUser = req.user._id;
    if (affectUser == actionUser) res.status(400).json('User cannot follow itself.')
    const followedUser = await usersLogic.toggleFollowByUserId(actionUser, affectUser);
    return res.json(followedUser);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}
export async function visitedCountryByUserId(req, res) {
  try {
    const { userId } = req.params;
   const{ countryId } = req.params;
   const user = await usersLogic.visitedCountryByUserId(userId,countryId);
    return res.json(user);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

export async function getUserByQuery(req,res){
  try{
    const { query } = req.params;
    const user = await usersLogic.UserByQuery(query);
    if(user.length === 0){
      return res.json('there´s no matches');
    }
    return res.json(user);
  }catch(e){
    console.log(e.message);
  }
}

export async function getUserComments(req ,res) {
  try {
    const userId = req.user._id;
    const getComments = await usersLogic.getUserComments(userId);
    return res.json(getComments);
  } catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}