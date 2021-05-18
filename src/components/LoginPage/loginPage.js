import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import  FacebookLogin  from "react-facebook-login";

// Styles
 import "./styles.scss";

// Cookies
import { setCookie } from "../../utils/cookies";

// components
import {
  googleClientCredentials,
  facebookClientCredentials,
} from "../../utils/config";

// Network Settings
import { fullApiUrl } from "../../utils/NetworkSettings";

// images
import SafeRestartLogoText from "../../images/safeRestartLogoText.png";
import googleIcon from "../../images/googleIcon.svg";
import facebookIcon from "../../images/facebookIcon.svg";

import AuthClient from "../../actions/loginAction";

export const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onGoogleLoginFailure = (error) => {
    alert("Unable to Authenticate with Google", error);
    console.error(error);
  };
  const googleResponse = (response) => {
    if (!response.tokenId) {
      console.error("Unable to Authenticate with Google", response);
      return;
    }
    externalLogin("google", response);
  };

  const responseFacebook = (response) => {
    if (!response.accessToken) {
      console.error("Unable to Authenticate with Facebook", response);
      return;
    }
    externalLogin("facebook", response);
  };

  // OKTA Related Logic START //
  const loginOktaSaml = () => {
    let smallCallBaclUrl = window.location.origin + "/intro";
    window.location.href =
      fullApiUrl + "saml/Login?returnUrl=" + smallCallBaclUrl;
  };

  const externalLogin = (provider, response) => {
    let tokenID = null;

    switch (provider) {
      case "google":
        tokenID = response.tokenId;
        break;
      case "facebook":
        tokenID = response.accessToken;
        break;
      default:
        return;
    }

    setLoginType(provider);
    setLoading(true);
    AuthClient(provider, tokenID, response.profileObj)
      .then((data) => {
        setCookie(
          "accessToken",
          data.accessToken,
          new Date(data.tokenExpiryDateTime)
        );

        setLoading(false);
        if (data.accessToken) {
          props.history.push("/landingPage");
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.Message);
      });
  };

  return (
    <>
      <div className="box login pr-6 pl-6 pt-6">
        <div className="mb-3 d-flex just-center">
          <img
            src={SafeRestartLogoText}
            height="auto"
            width="100%"
            className="login-logo"
            alt="safe restart logo"
          />
        </div>

        <div className="mb-6 mt-4">
          <h4 className="login-title is-4 mb-5">Choose login method</h4>
          <div className="mb-4">
            <GoogleLogin
              clientId={googleClientCredentials.clientID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  type="button"
                  
                  className={`google-btn ${
                    loading && loginType === "google" ? "is-loading" : ""
                  }`}
                >
                  <img
                    className="open-icon"
                    src={googleIcon}
                    alt="google button"
                  />
                  <span style={{paddingTop:'4px'}}>Login With Google</span>
                </button>
              )}
              buttonText="Google Login"
              onSuccess={googleResponse}
              onFailure={onGoogleLoginFailure}
            />
          </div>
          <div className="mb-4">
            <FacebookLogin
              appId={facebookClientCredentials.appID}
              autoLoad={false}
              fields="name,email,first_name,last_name,picture"
              scope="public_profile,email"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  type="button"
                  className={`facebook-btn ${
                    loading && loginType === "facebook" ? "is-loading" : ""
                  }`}
                >
                  <img
                    className="open-icon"
                    src={facebookIcon}
                    alt="facebook button"
                  />
                  Facebook
                </button>
              )}
            />
          </div>
          <div className="mb-4">
            <button
              className={`okta-btn ${
                loading && loginType === "okta" ? "is-loading" : ""
              }`}
              onClick={() => loginOktaSaml()}
            >
              Login With Okta
            </button>
          </div>
          <h4 className="mt-4">
            <strong>
              <a href="https://app.smartsheet.com/b/form/83abbc6cb2ce46c8a394dffa06413f13">
                Support
              </a>
            </strong>
          </h4>
        </div>
      </div>
    </>
  );
};
