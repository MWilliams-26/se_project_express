const { JWT_SECRET = 'a gift is not enough' } = process.env;

console.log(JWT_SECRET);
module.exports = {
  JWT_SECRET,
};