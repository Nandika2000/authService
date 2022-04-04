const createToken = async (userName) => {
  const { createHmac } = await import('crypto');
  const secret = process.env.SECRET;
  const hash = createHmac('sha256', secret)
    .update(userName)
    .digest('hex');
  return hash;
};
module.exports = {
  createToken,
};
