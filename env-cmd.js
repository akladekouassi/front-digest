const REACT_APP_FAKE_API_URL_LOCAL = 'http://localhost:8080';
module.exports = Promise.resolve({
  local_dev: {
    REACT_APP_FAKE_API_URL: REACT_APP_FAKE_API_URL_LOCAL,
  },
});
