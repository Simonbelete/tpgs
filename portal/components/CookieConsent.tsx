import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentComponent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I understand"
      cookieName="cookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#008a3f", color: "#fff", fontSize: "13px" }}
      expires={150}
    >
      <span style={{ fontFamily: "Inter,sans-serif", fontWeight: 600 }}>
        This website uses cookies.{" "}
      </span>
      <span style={{ fontSize: "13px", fontFamily: "Inter,sans-serif" }}>
        We use cookies to enhance your browsing and analyze our traffic. By
        clicking &quot;I understand&quot;, you consent to our use of cookies.
      </span>
    </CookieConsent>
  );
};

export default CookieConsentComponent;
