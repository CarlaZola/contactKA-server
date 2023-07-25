export default {
    userComplete: {
      full_name: 'Pedro',
      phone: "48999998774",
      email: 'pedro@kenzie.com.br',
      password: '1234',
      admin: true,
    },
    userWithoutAdmin: {
      full_name: 'Alex',
      phone: "48999998774",
      email: 'alex@kenzie.com.br',
      password: '1234',
    },
    userUnique: {
      full_name: 'Felipe',
      phone: "48999952356",
      email: 'felipe@kenzie.com.br',
      password: '1234',
    },
    userInvalidBody: {
      full_name: 1234,
      password: '1234',
      email: [],
    },
    userInvalidBody2: {
      full_name: 'Alex',
      email: 'mail',
      password: 123456,
    },
    userInvalidBody3: {
        full_name: 'Flanders',
        email: 'mailinvalidin',
        password: 123456,
        phone: "um fone nada a ver com mais de 11 chares",
      },
  };
  