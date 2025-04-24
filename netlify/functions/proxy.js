const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const targetUrl = new URLSearchParams(event.queryStringParameters).get("url");

  if (!targetUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'url' parameter" })
    };
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type") || "";

    const body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: typeof body === "string" ? body : JSON.stringify(body)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
