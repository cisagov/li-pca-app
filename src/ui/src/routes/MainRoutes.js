import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MainLayout from "layout/MainLayout";

// campaigns page routing
const CampaignsPage = Loadable(lazy(() => import("views/campaigns")));
// campaign data entry page routing
const CampaignDataEntryPage = Loadable(
  lazy(() => import("views/campaigns/dataentry"))
);
// customers page routing
const CustomersPage = Loadable(lazy(() => import("views/customers")));
// customer data entry page routing
const CustDataEntryPage = Loadable(
  lazy(() => import("views/customers/dataentry"))
);
// phish-reconn page routing
const PhishReconnPage = Loadable(lazy(() => import("views/phish-reconn")));
// templates page routing
const TemplatesPage = Loadable(lazy(() => import("views/templates")));
// templates data entry page routing
const TemplateDataEntryPage = Loadable(
  lazy(() => import("views/templates/dataentry"))
);
// landing-pages page routing
const LandingPagesPage = Loadable(lazy(() => import("views/landing-pages")));
const LPDataEntryPage = Loadable(
  lazy(() => import("views/landing-pages/dataentry"))
);
// sending-domains page routing
const SendingDomainsPage = Loadable(
  lazy(() => import("views/sending-domains"))
);
const SDDataEntryPage = Loadable(
  lazy(() => import("views/sending-domains/dataentry"))
);
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/campaigns",
      element: <CampaignsPage />,
    },
    {
      path: "/campaigns/data-entry",
      element: <CampaignDataEntryPage />,
    },
    {
      path: "/customers",
      element: <CustomersPage />,
    },
    {
      path: "/customers/data-entry",
      element: <CustDataEntryPage />,
    },
    {
      path: "/phish-reconn",
      element: <PhishReconnPage />,
    },
    {
      path: "/templates",
      element: <TemplatesPage />,
    },
    {
      path: "/templates/data-entry",
      element: <TemplateDataEntryPage />,
    },
    {
      path: "/landing-pages",
      element: <LandingPagesPage />,
    },
    {
      path: "/landing-pages/data-entry",
      element: <LPDataEntryPage />,
    },
    {
      path: "/sending-domains",
      element: <SendingDomainsPage />,
    },
    {
      path: "/sending-domains/data-entry",
      element: <SDDataEntryPage />,
    },
  ],
};

export default MainRoutes;
