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
  featureCard: {
    detach: {
      'aria-label': 'Detach Feature',
      label: 'Detach',
    },
    attach: {
      'aria-label': 'Attach Feature',
      label: 'Attach',
    },
  },
  badges: {
    edit: {
      name: {
        label: 'Badge Name',
        placeholder: 'Badge Name',
        errors: {
          required: 'Badge Name is a required field.',
        },
      },
    },
  },
  plans: {
    edit: {
      name: {
        label: 'Plan Name',
        placeholder: 'Name',
        hint: 'The publicly visible name of the plan.',
        errors: {
          required: 'Plan name is required.',
        },
      },
    },
  },
  formActions: {
    buttons: {
      save: 'Save',
      saved: 'Saved',
      saving: 'Saving',
      discard: 'Discard Changes',
    },
  },
}
