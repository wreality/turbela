// This is just an example,
// so you can safely delete all default props below

export default {
  auth: {
    fields: {
      email: 'Email',
      password: 'Password',
    },
    errorConditions: {
      INVALID_CREDENTIALS: 'Email or password is invalid.',
      INVALID_EMAIL: 'That email address is not registered',
    },
    buttons: {
      continue: 'Next',
      back: 'Back',
      login: 'Sign in',
    },
    text: {
      password: "Just need to verify you're you.",
    },
    headers: {
      login: 'Welcome Back',
      email: 'Manage Your Account',
    },
  },
  tips: {
    'enter-opens-user': 'Press enter to open this user.',
  },
}
