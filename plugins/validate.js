export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('validate', {
    compareString: (val1, val2) => {
      console.log(val1, val2)
      return val1 === val2 ? true : 'Value doesnt match'
    },
    required: value => !!value || 'Required.',
    phone: phone =>
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
        phone
      ) || 'Invalid phone number',
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    }
  })
}
