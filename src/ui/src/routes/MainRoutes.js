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
  lazy(() => import("views/customers/newcustomer"))
);
// templates page routing
const TemplatesPage = Loadable(lazy(() => import("views/templates")));
const EditTemplatePage = Loadable(
  lazy(() => import("views/templates/edittemplate"))
);
const NewTemplatePage = Loadable(
  lazy(() => import("views/templates/newtemplate"))
);
// landing-pages page routing
const LandingPagesPage = Loadable(lazy(() => import("views/landing-pages")));
// sending-profiles page routing
const SendingProfilesPage = Loadable(
  lazy(() => import("views/sending-profiles"))
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
      path: "/templates/newtemplate",
      element: <NewTemplatePage />,
    },
    {
      path: "/templates/edittemplate",
      element: <EditTemplatePage />,
    },
    {
      path: "/landing-pages",
      element: <LandingPagesPage />,
    },
    {
      path: "/sending-profiles",
      element: <SendingProfilesPage />,
    },
  ],
};

export default MainRoutes;
