const successResponse = (response, message) => {
  return response.status(200).json({
    status: 200,
    success: true,
    message: message,
  });
};

const successResponseWithData = (response, message, data) => {
  return response.status(200).json({
    status: 200,
    success: true,
    message: message,
    data: data,
  });
};

const successResponseWithToken = (response, message, data, token) => {
  return response
    .status(200)
    .cookie("token", token, {
      expire: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Prevents client-side access via JavaScript
      secure: process.env.NODE_ENV === "production"

    })
    .json({
      success: true,
      status: 200,
      message,
    });
};

const notFoundResponse = (response, message, data) => {
  return response.status(404).json({
    status: 404,
    success: false,
    message: message,
    data: data,
  });
};

const errorResponse = (response, message, data) => {
  return response.status(400).json({
    status: 400,
    success: false,
    message: message,
    data: data,
  });
};

export {
  successResponse,
  successResponseWithData,
  successResponseWithToken,
  notFoundResponse,
  errorResponse,
};
