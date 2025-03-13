// export const sendToken = (user, statusCode, res, message) => {
//   const token = user.getJWTToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true, // Set httpOnly to true
//   };

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     user,
//     message,
//     token,
//   });
// };
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  console.log("Generated JWT Token:", token);

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // Secure cookie
    secure: true, // Use true since frontend is deployed (for localhost use false)
    sameSite: "None", // Required for cross-site cookies
  };

  res
    .status(statusCode)
    .cookie("token", token, options) // Store JWT in cookies
    .json({
      success: true,
      user,
      message,
      token, // Also return token in response for debugging
    });
};




