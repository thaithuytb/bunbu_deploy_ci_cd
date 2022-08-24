import { Request, Response } from 'express';
import { Pool } from 'mysql';
import {
  getTokenWithTheCode,
  getUserWithTokenFacebook,
  getUserWithTokenGoogle,
} from '../services/oAuth2.service';

export const oAuth2GoogleController =
  (db: Pool) => async (req: Request, res: Response) => {
    //get the code
    const { code } = req.query;
    try {
      //get id_token and access_token with the code and client id, client secret
      const responseToken = await getTokenWithTheCode(code as string);
      //get User with id_token and access_token
      const userGoogle = await getUserWithTokenGoogle(responseToken);

      if (!userGoogle.verified_email) {
        return res.status(403).json({
          success: false,
          message: 'Google account is not verified',
        });
      }

      //--------------------------------------
      /**
       * Check if the user (email) already exists, create access token and send it about client
       * else create user (with email) and create access token and sen it about client
       */
      res.redirect('http://localhost:3000/todo');
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const oAuth2FacebookController =
  (db: Pool) => async (req: Request, res: Response) => {
    // const { userID, accessToken } = req.body;
    console.log(req.query);
    //get the userID and accessToken
    try {
      // const userFacebook = await getUserWithTokenFacebook(userID, accessToken);
      // if (!userFacebook) {
      //   return res.status(403).json({
      //     success: false,
      //     message: 'Facebook account is not verified',
      //   });
      // }
      // console.log('b');
      // res.redirect('http://localhost:3000/todo');
      // res.status(200).json({
      //   success: true,
      // });
      // console.log('x');
    } catch (error) {
      console.log(error);
    }
  };
