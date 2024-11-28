// src/config/ankh.ts
import { v4 } from "uuid";
var AnkhConfig = {
  auth: {
    mode: "IN_APP",
    cognito: {
      loginWith: {
        email: true
      },
      userAttributes: {
        "custom:firstName": {
          dataType: "String",
          mutable: true,
          minLen: 2,
          maxLen: 25
        },
        "custom:lastName": {
          dataType: "String",
          mutable: true,
          minLen: 2,
          maxLen: 25
        }
      }
    }
  },
  pages: [
    {
      id: v4(),
      name: "Home",
      route: "/",
      uis: [
        {
          id: v4(),
          name: "Text",
          conf: {
            value: "HomeText"
          }
        }
      ]
    },
    {
      id: v4(),
      name: "Profile",
      route: "/profile",
      uis: [
        {
          id: v4(),
          name: "Profile"
        }
      ]
    },
    {
      id: v4(),
      name: "Settings",
      route: "/settings",
      uis: [
        {
          id: v4(),
          name: "Settings"
        }
      ]
    }
  ]
};
export {
  AnkhConfig
};
