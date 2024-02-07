import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentComponent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I understand!"
      cookieName="cookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#008a3f", color: "#fff", fontSize: "13px" }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.{" "}
    </CookieConsent>
  );
};

export default CookieConsentComponent;
