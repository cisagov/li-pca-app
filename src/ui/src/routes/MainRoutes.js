import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MainLayout from "layout/MainLayout";

// campaigns page routing
const CampaignsPage = Loadable(lazy(() => import("views/campaigns")));
// customers page routing
const CustomersPage = Loadable(lazy(() => import("views/customers")));
// customer data entry page routing
const CustDataEntryPage = Loadable(
  lazy(() => import("views/customers/dataentry"))
);
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
// sending-profiles page routing
const SendingProfilesPage = Loadable(
  lazy(() => import("views/sending-profiles"))
);
const SPDataEntryPage = Loadable(
  lazy(() => import("views/sending-profiles/dataentry"))
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
      path: "/customers",
      element: <CustomersPage />,
    },
    {
      path: "/customers/data-entry",
      element: <CustDataEntryPage />,
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
      path: "/sending-profiles",
      element: <SendingProfilesPage />,
    },
    {
      path: "/sending-profiles/data-entry",
      element: <SPDataEntryPage />,
    },
  ],
};

export default MainRoutes;
