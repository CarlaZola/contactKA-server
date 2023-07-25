import { sign } from 'jsonwebtoken';

const secretKey: string = '1234';
process.env.SECRET_KEY = secretKey;

export default {
  genToken: (id: number) => {
    return sign({ id }, secretKey, { subject: id.toString() });
  },

  jwtMalformed: '12345',
};
