const parseServerResponse = response => ({
  code: response.status_code,
  message: response.message,
  data: response.data
});

const parseUser = user => ({
  name: user.full_name,
  email: user.email,
  phone: user.phone_number
});

export default { parseServerResponse, parseUser };
