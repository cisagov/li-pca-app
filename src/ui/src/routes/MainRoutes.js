import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MainLayout from "layout/MainLayout";

// campaigns page routing
const CampaignsPage = Loadable(lazy(() => import("views/campaigns")));
// customers page routing
const CustomersPage = Loadable(lazy(() => import("views/customers")));
// templates page routing
const NewCustomerPage = Loadable(
  lazy(() => import("views/customers/newcustomer"))
);
// templates page routing
const TemplatesPage = Loadable(lazy(() => import("views/templates")));
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
      path: "/customers/newcustomer",
      element: <NewCustomerPage />,
    },
    {
      path: "/templates",
      element: <TemplatesPage />,
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
