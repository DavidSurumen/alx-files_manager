// UsersController.js

/**
 * @file controllers/UsersController.js
 * @description This file contains the logic for handling user-related
 * requests
 */
import crypto from 'crypto';
import dbClient from '../utils/db';

/**
 * @class UsersController class to handle user-related operations.
 */
class UsersController {
  /**
   * Handles POST requests to '/users' to create a new user in the database.
   */
  static async postNew(req, res) {
    // get credentials from request object
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    // check if the email already in db
    const usersColl = dbClient.client.db(dbClient.dbName).collection('users');
    const userInDb = await usersColl.findOne({ email });
    if (userInDb) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    // hash password in SHA1
    const hashedPwd = crypto.createHash('sha1').update(password).digest('hex');

    try {
      // save a new user in the collection 'users'
      // return status 201, email and id of the created user.
      const result = await usersColl.insertOne({ email, password: hashedPwd });
      res.status(201).json({ email: result.ops[0].email, id: result.ops[0]._id });
    } catch (err) {
      console.log('Error saving user:', err);
      res.status(500).json({ error: 'Didn\'t save. Internal Server Error' });
    }
  }
}

export default UsersController;
