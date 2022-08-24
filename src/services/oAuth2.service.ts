import axios from 'axios';
import QueryString from 'qs';

interface ResultUserFromGoogle {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface ResultTokenFromGoogle {
  id_token: string;
  access_token: string;
}

export const getTokenWithTheCode = async (
  code: string
): Promise<ResultTokenFromGoogle> => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OauthRedirectUrl,
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post<ResultTokenFromGoogle>(
      url,
      QueryString.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return { id_token: res.data.id_token, access_token: res.data.access_token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserWithTokenGoogle = async (
  token: ResultTokenFromGoogle
): Promise<ResultUserFromGoogle> => {
  try {
    const res = await axios.get<ResultUserFromGoogle>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${token.id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserWithTokenFacebook = async (
  userID: string,
  accessToken: string
) => {
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  const res = await axios.get(url);
  return res.data;
  try {
  } catch (error) {
    console.log(error);
  }
};
