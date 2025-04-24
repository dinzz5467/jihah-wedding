const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const url = new URL(event.rawUrl);
  const target = url.searchParams.get("url");

  if (!target) {
    return {
      statusCode: 400,
      body: "Missing 'url' query parameter"
    };
  }

  try {
    const response = await fetch(target);
    const body = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error: ${err.toString()}`
    };
  }
};
