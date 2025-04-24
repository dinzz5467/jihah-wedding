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
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        "Content-Type": event.headers["content-type"] || "application/x-www-form-urlencoded",
      },
      body: ["POST", "PUT", "PATCH"].includes(event.httpMethod) ? event.body : undefined
    });

    const data = await response.text(); // For any response type, including HTML or JSON

    return {
      statusCode: response.status,
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
