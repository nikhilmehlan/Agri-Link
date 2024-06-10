import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/GeminiContext";
import sanitizeHtml from 'sanitize-html';
import Sidebar from "../Sidebar/Sidebar";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const handleCopyClick = () => {
    // Remove HTML tags from the result data
    const sanitizedData = resultData.replace(/<[^>]*>?/gm, "");

    // Copy the sanitized result data to the clipboard
    navigator.clipboard.writeText(sanitizedData);
    // Optionally, you can provide user feedback that the data has been copied
    // For example, you can display a tooltip or a message indicating that the data has been copied.
  };
  return (
    <div className="main">

      <div className="agribot-main">
        <Sidebar />
        <div className="main-container">
          <div className="nav">
            <p>AgriBot</p>
            <img src={assets.user_icon} alt="" />
          </div>
          {showResult ? (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                  </div>
                ) : (
                  <>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {recentPrompt}
                      {"\n\n"}
                      {sanitizeHtml(resultData, {
                        allowedTags: [],
                        allowedAttributes: {},
                      })}
                    </pre>

                    <button onClick={handleCopyClick} className="copy-button">
                      <img src={assets.copy} alt="Copy" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="greet">
                <p>
                  <span>Hello,नमस्ते Farmer.</span>
                </p>
                <p>
                  How can I help you today? <br />
                  मैं आपकी क्या मदद कर सकता हूं?
                </p>
              </div>
              <div className="cards">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Based on current market trends and projected yields, suggest optimal pricing strategies for our vegetables at the farmers' market"
                    )
                  }
                >
                  <p>
                    Based on current market trends and projected yields, suggest
                    optimal pricing strategies for our vegetables at the farmers'
                    market
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("कृषि उपज की सही खेती के लिए सलाह दें।")
                  }
                >
                  <p>कृषि उपज की सही खेती के लिए सलाह दें।</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Compare different irrigation methods for my farm - pros and cons of drip vs. sprinkler systems?"
                    )
                  }
                >
                  <p>
                    Compare different irrigation methods for my farm - pros and
                    cons of drip vs. sprinkler systems?
                  </p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("मेरे खेत की मिट्टी की गुणवत्ता कैसे बढ़ाएँ?")
                  }
                >
                  <p>मेरे खेत की मिट्टी की गुणवत्ता कैसे बढ़ाएँ?</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress} // Add event listener for key press
                value={input}
                type="text"
                placeholder="Enter a prompt here"
                style={{ border: "1px solid black", borderRadius: "10px" }}
              />
              <div>
                <img src={assets.gallery_icon} width={30} alt="" />
                <img src={assets.mic_icon} width={30} alt="" />
                {input ? (
                  <img
                    onClick={() => onSent()}
                    src={assets.send_icon}
                    width={30}
                    alt=""
                  />
                ) : null}
              </div>
            </div>
            <p className="bottom-info">
              AgriBot may display inaccurate info, including about people, so
              double-check its responses. Your privacy and AgriBot Apps
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Main;
