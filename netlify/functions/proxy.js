const fetch = require("node-fetch");

exports.handler = async function(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'url' query parameter" }),
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.text(); // Use text to forward any content-type

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("content-type") || "text/plain",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
