const express = require("express");
const router = express.Router();
const axios = require("axios");
const Venue = require("../models/venue");
const Catering = require("../models/catering");
const Entertainment = require("../models/entertainment");

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: "messages array required." });
  }

  try {
    // Load real data from DB so AI knows what's available
    const [venues, caterings, entertainments] = await Promise.all([
      Venue.find().select("name style capacity price"),
      Catering.find().select("name style price_per_person"),
      Entertainment.find().select("name type style price"),
    ]);

    const venueList = venues.map(v => `- ${v.name} (${v.style}, ${v.capacity} хүн, ₮${v.price.toLocaleString()})`).join("\n");
    const cateringList = caterings.map(c => `- ${c.name} (${c.style}, ₮${c.price_per_person.toLocaleString()}/хүн)`).join("\n");
    const entertainmentList = entertainments.map(e => `- ${e.name} (${e.type}, ${e.style}, ₮${e.price.toLocaleString()})`).join("\n");

    const systemPrompt = `Та ZEBE Event Planner-ийн AI зөвлөх юм. Монгол болон Англи хэлээр хариулна. 
Хэрэглэгчид арга хэмжээ зохион байгуулахад зөвлөгөө өгнө. Хариултаа богино, практик, найрсаг байлга.

Манай системд байгаа үйлчилгээнүүд:

🏛️ VENUE (Тайзны газар):
${venueList}

🍽️ CATERING (Хоол):
${cateringList}

🎵 ENTERTAINMENT (Цэнгээн):
${entertainmentList}

Хэрэглэгч төсөв, хүний тоо, арга хэмжээний төрлийн талаар асуувал дээрх мэдээллийг ашиглан тодорхой зөвлөгөө өг. 
Төгсгөлд нь "AI Planner ашиглан яг төлөвлөлт үүсгэхийг зөвлөж байна!" гэж нэмж болно.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const reply = response.data.content[0].text;
    return res.status(200).json({ success: true, reply });

  } catch (err) {
    console.error("Chat error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "AI-тай холбогдоход алдаа гарлаа. API key шалгана уу.",
    });
  }
});

module.exports = router;