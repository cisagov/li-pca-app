// assets
import {
  IconUser,
  IconNotebook,
  IconBrowser,
  IconSend,
  IconMail,
  IconHelp,
} from "@tabler/icons";

// constant
const icons = {
  IconUser,
  IconNotebook,
  IconBrowser,
  IconSend,
  IconMail,
  IconHelp,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const main = {
  id: "main",
  title: "Main",
  type: "group",
  children: [
    {
      id: "campaigns",
      title: "Campaigns",
      type: "item",
      url: "/campaigns",
      icon: icons.IconMail,
      breadcrumbs: false,
    },
    {
      id: "customers",
      title: "Customers",
      type: "item",
      url: "/customers",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "templates",
      title: "Templates",
      type: "item",
      url: "/templates",
      icon: icons.IconNotebook,
      breadcrumbs: false,
    },
    {
      id: "landing-pages",
      title: "Landing Pages",
      type: "item",
      url: "/landing-pages",
      icon: icons.IconBrowser,
      breadcrumbs: false,
    },
    {
      id: "sending-profiles",
      title: "Sending Profiles",
      type: "item",
      url: "/sending-profiles",
      icon: icons.IconSend,
      breadcrumbs: false,
    },
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://codedthemes.gitbook.io/berry/",
      icon: icons.IconHelp,
      external: true,
      target: true,
    },
  ],
};

export default main;
