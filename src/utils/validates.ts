export const MAX_LENGTH_EMAIL = 50;

export const MIN_LENGTH_PSW = 6;
export const MAX_LENGTH_PSW = 20;

export const VALIDATE_FORM = {
  USERNAME: [
    {
      required: true,
      message: "Username can't be empty",
    },
    {
      max: MAX_LENGTH_EMAIL,
      message: "Username can't be longer than 50 characters",
    },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: 'Username format is invalid',
    },
  ],
  PASSWORD: [
    {
      validator: (_: any, value: string) => {
        if (!value) return Promise.reject(new Error("Password can't be empty"));
        if (value.length < MIN_LENGTH_PSW || value.length > MAX_LENGTH_PSW) {
          return Promise.reject(
            new Error('Your password should be between 8 and 20 characters long')
          );
        }
        if (value.includes(' ')) {
          return Promise.reject(new Error('Password must not contain space'));
        }
        return Promise.resolve();
      },
    },
  ],
  CF_PASSWORD: [
    ({ getFieldValue }: any) => ({
      validator(_: any, value: string) {
        if (!value) return Promise.reject(new Error("Confirm password can't be empty"));
        switch (true) {
          case getFieldValue('password') !== value: {
            return Promise.reject(new Error('Confirm password is wrong'));
          }

          default:
            return Promise.resolve();
        }
      },
    }),
  ]
};
