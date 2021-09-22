import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";

import awsExports from "./aws-exports";
import Screens from "./components/Screens";

const Title = styled("h1")`
  text-align: center;
  text-transform: uppercase;
  color: #1747ff;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px"
  },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: "4px"
  },
  sectionHeader: {
    color: "#2900ff"
  },
  sectionFooterSecondaryContent: {
    color: "#303952"
  },
  inputLabel: {
    color: "#2900ff"
  },
  input: {
    backgroundColor: "#e1eaf5",
    color: "#2900ff"
  },
  hint: {
    color: "#2900ff"
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "1747ff"
  },
  a: {
    color: "#1747ff"
  }
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Screens />
  ) : (
    <>
      <Title>Apprentice Portal | Get Started</Title>
      <Authenticator
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        amplifyConfig={awsExports}
        theme={theme}
      />
    </>
  );
}

export default App;
