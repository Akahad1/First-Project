import { TErrorSources } from "../interface/error";

const handleDubticatError = (err: any) => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSource: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists!!`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    megssage: "invalied ID",
    errorSource,
  };
};

export default handleDubticatError;
