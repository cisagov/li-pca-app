# Changelog for UI only #

All notable changes to this project will be documented in this file.
Changes begin after deviation from the original Berry template.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] ##

## [0.0.1] - 2022-02-09 ##

- **Added**
  - GENERATE_SOURCEMAP=false to "scripts" - "start" command in package.json
  - lipca_logo.png to src/assets/images
- **Changed**
  - "react-scripts" version from 4.0.3 to 5.0.0 in package.json
  - secondary colors to other colors in src/assets/scss/\_themes-vars.module.scss
  - svg file to a real image in src/ui-component/Logo.js
- **Removed**
  - "airbnb" package from .eslintrc
  - removed sign in capability with Google in AuthLogin.js and AuthRegister.js in
    src/views/pages/authentiation/auth-forms

## [0.0.2] - 2022-02-10 ##

- **Added**
  - templates, landing-pages, sending-profiles,
    campaigns folders created with their own index.js in src/views
- **Changed**
  - sample-page view is now called customer along with all its references
  - image used for User1 in src/layout/MainLayout/Header/ProfileSection/index.js
- **Removed**
  - removed search and notification buttons in the index.js and their folders in
    src/layout/MainLayout/Header/
  - removed unneeded text and cards and their imports in the profile pop down in
    src/layout/MainLayout/Header/ProfileSection/index.js

## [0.0.3] - 2022-02-11 ##

- **Added**
  - in src/ui-component, created EnhancedTable.js and added it to campaigns index
- **Changed**
  - in package.json, changed the name, version, and homepage
  - in config.js, changed the basename and defaultPath
  - in README.md, modified to include Li-PCA info
  - in public folder, replaced the favicon and imported it in index.html
- **Removed**
  - commented out useTheme in src/ui-component/Logo.js
  - Removed logos and google icons from src/asset
  - Removed importing utilities and dashboard from src/layout/menu-items/index.js,
    src/routes/MainRoutes.js, and their folders in src/views
  - public/index.html removed some meta tags

## [0.0.4] - 2022-02-22 ##

- **Added**
  - Added temporary data to src/views/customers/index.js
  - Added search bar and add row and data props reference and proptypes to src/ui-component/SingleRowSelectGrid.js
  - Added .eslintrc
- **Changed**
  - Cleaned up AuthRegister.js and AuthLogin.js from src/views/pages
- **Removed**
  - Removed EnhancedTable.js and the reference to it in src/views/campaigns/index.js

## [0.0.5] - 2022-03-15 ##

- **Added**
  - New route in routes/MainRoutes.js for "/customers/newcustomer"
  - New folders in ui-component called /forms and /tables
  - The folder /forms has new components CustomerForm and CustomerPOCForm
  - The folder /tables has new components MainDataTable and DisplayDataTable
  - Add packages "@date-io/date-fns", "@types/date-fns" for selecting dates in a
   form
  - Add editcustomer by making a copy of addcustomer
  - New route in routes/MainRoutes.js for "/customers/editcustomer"
  - Add toggle functionality to edit|newcustomer, button "Add Customer Contact"
  - Add alert in newcustomer "No contacts available"

- **Changed**
  - .eslintrc has been modified to match the linter in pre-commit
  - Change references to removed file in views/customers/index.js to new one
  - Turned newcustomer and editcustomer into class components

- **Removed**
  - SingleRowSelectionGrid.js has been removed and replaced with /tables/MainDataTable.js
  - Removed unused props and style in CustomerForm.js
  - Removed components and data in newcustomer only needed in editcustomer

## [0.0.6] - 2022-03-23 ##

- **Changed**
  - In newcustomer.js and editcustomer.js, they are back to being
   functional components and added two hooks, one that takes care of
   toggling the add customer contact card, and the other that will pass
   along the data to the forms and back
  - In CustomerForm.js and CustomerPOCForm.js, each form element now
   includes a value from props and an onChange function that will update the value

## [0.0.7] - 2022-04-1 ##

- **Added**
  - Installed axios. It is added to the package.json, package-lock.json, and
  yarn.lock files
  - Created a json for customer mock data
  - Add edit button functionality to table, allowing table data to be used in the
  component it gets re-routed to
  - Add data specifying whether the new component will get routed data for a new
  customer or a customer edit in MainDataTable.js
  - Add to CustomerForm.js and CustomerPOCForm.js logic on whether the data is for
  a new customer or a customer edit and when to have the save button disabled
  - Add save validation and confirmation pop ups to CustomerForm.js
  - Add logic to newcustomer.js to clean data before it is sent over to the form

- **Changed**
  - Update CustomerForm.js and CustomerPOCForm.js to use Formik and Yup
  - Renamed new NewCustomerPage to CustDataEntryPage in MainRoutes.js
  - Refactored newcustomer.js to include edit functionality
  - Update defaultPath in config.js

- **Removed**
  - Removed mock data from customer/index.js
  - Remove editcustomer route from MainRoutes.js
  - Delete unneeded editcustomer.js

## [0.0.8] - 2022-04-15 ##

- **Added**
  - Add POST HTTP request with axios in newcustomer.js

- **Changed**
  - Refactor JSX in customers/index.js
  - Update formik submit function to remove re-routing and add styling to
  dialogs in CustomerForm.js

## [0.0.8] - 2022-04-19 ##

- **Added**
  - Add PUT and DELETE HTTP requests using axios in newcustomer.js and hooks
  - Add edit and delete functionality and JSX to CustomerForm.js
  - Add new folder popups and two new components, ConfirmDialog.js and ResultDialog.js
  for reusable nature

- **Changed**
  - Update newcustomer.js and CustomerForm.js to use reusable dialog components
  - Update setCustData hook to only overwrite changed data rather than
  overwriting the whole custData object in CustomerForm.js
  - Update secondary colors in _themes-vars.module.scss
