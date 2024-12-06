// src/config/ankh.ts
import { v4 } from "uuid";
var EAnkhAuthMode = /* @__PURE__ */ ((EAnkhAuthMode2) => {
  EAnkhAuthMode2["Entire"] = "ENTIRE";
  EAnkhAuthMode2["InApp"] = "IN_APP";
  return EAnkhAuthMode2;
})(EAnkhAuthMode || {});
var COLORS = {
  WHITE: "#fff",
  RED: "#cf1444",
  BLACK: "#000"
};
var AnkhConfig = {
  brand: {
    themes: [
      {
        name: "light",
        colors: {
          default: {
            text: COLORS.BLACK,
            bg: COLORS.WHITE
          },
          primary: {
            text: COLORS.WHITE,
            bg: COLORS.RED
          }
        },
        active: true,
        logo: "logo.jpg"
      }
    ]
  },
  auth: {
    mode: "IN_APP" /* InApp */,
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
      name: "index",
      route: "/",
      title: "Home",
      icon: "home",
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
      name: "profile",
      route: "/profile",
      title: "Profile",
      icon: "account",
      uis: [
        {
          id: v4(),
          name: "Profile"
        }
      ]
    },
    {
      id: v4(),
      name: "settings",
      route: "/settings",
      title: "Settings",
      icon: "cog",
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
  EAnkhAuthMode,
  AnkhConfig
};
