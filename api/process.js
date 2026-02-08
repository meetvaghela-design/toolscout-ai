// Path: api/process.js
exports.handler = async (event, context) => {
  // Sirf POST request allow karo
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const { toolId, prompt } = JSON.parse(event.body);

    let result = "";
    // 20 Tools ka basic logic (Abhi testing ke liye)
    switch(toolId) {
      case 'script':
        result = "PRO SCRIPT: [Viral Hook] - [Engaging Story] - [Strong CTA] generated successfully!";
        break;
      case 'seo':
        result = "SEO TAGS: #viral #trending #aitools #creators #toolscout";
        break;
      case 'captions':
        result = "AI is analyzing your video for viral captions...";
        break;
      default:
        result = `AI Response for ${toolId} is ready!`;
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true, data: result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
