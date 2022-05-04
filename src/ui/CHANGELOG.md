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
  - Add the lipca_logo.png to src/assets/images
- **Changed**
  - "react-scripts" version from 4.0.3 to 5.0.0 in package.json
  - Secondary colors to other colors in src/assets/scss/\_themes-vars.module.scss
  - Update the svg file to a real image in src/ui-component/Logo.js
- **Removed**
  - Remove "airbnb" package from .eslintrc
  - Remove sign in capability with Google in AuthLogin.js and AuthRegister.js in
    src/views/pages/authentiation/auth-forms

## [0.0.2] - 2022-02-10 ##

- **Added**
  - Add folders templates, landing-pages, sending-profiles,
    campaigns created with their own index.js in src/views
- **Changed**
  - Update sample-page view is now called customer along with all its references
  - Update image used for User1 in src/layout/MainLayout/Header/ProfileSection/index.js
- **Removed**
  - Remove search and notification buttons in the index.js and their folders in
    src/layout/MainLayout/Header/
  - Remove unneeded text and cards and their imports in the profile pop down in
    src/layout/MainLayout/Header/ProfileSection/index.js

## [0.0.3] - 2022-02-11 ##

- **Added**
  - In src/ui-component, created EnhancedTable.js and added it to campaigns index
- **Changed**
  - In package.json, changed the name, version, and homepage
  - In config.js, changed the basename and defaultPath
  - In README.md, modified to include Li-PCA info
  - In public folder, replaced the favicon and imported it in index.html
- **Removed**
  - Comment out useTheme in src/ui-component/Logo.js
  - Remove logos and google icons from src/asset
  - Remove importing utilities and dashboard from src/layout/menu-items/index.js,
    src/routes/MainRoutes.js, and their folders in src/views
  - public/index.html removed some meta tags

## [0.0.4] - 2022-02-22 ##

- **Added**
  - Add temporary data to src/views/customers/index.js
  - Add search bar and add row and data props reference and proptypes to src/ui-component/SingleRowSelectGrid.js
  - Add .eslintrc
- **Changed**
  - Clean up AuthRegister.js and AuthLogin.js from src/views/pages
- **Removed**
  - Remove EnhancedTable.js and the reference to it in src/views/campaigns/index.js

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
  - Turn newcustomer and editcustomer into class components

- **Removed**
  - SingleRowSelectionGrid.js has been removed and replaced with /tables/MainDataTable.js
  - Remove unused props and style in CustomerForm.js
  - Remove components and data in newcustomer only needed in editcustomer

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
  - Install axios. It is added to the package.json, package-lock.json, and
  yarn.lock files
  - Create a json for customer mock data
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
  - Remove mock data from customer/index.js
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

## [0.0.9] - 2022-04-22 ##

- **Added**
  - Add API calls to use _id in the URL instead of hardcoded values in newcustomer.js
  - Add yup validation for unique Customer Identifer values in CustomerForm.js
  and MainDataTable.js and newcustomer.js to get the list of identifiers

## [0.0.10] - 2022-04-28 ##

- **Added**
  - Add customer campaigns display table in newcustomer.js when form is in edit mode
  - Add a textfield to confirm a delete in ConfirmDialog.js
- **Changed**
  - Update popup dialog spacing and font sizes and fix package imports to use the
  correct material-ui package names in ConfirmDialog.js and ResultDialog.js
  - Update appendixADate to a real date format in CustomerForm.js
  - Comment unneeded layout customization rotating button from
  layout/Customization/index.js

## [0.0.11] - 2022-05-03 ##

- **Added**
  - Create a json for customer mock data
- **Changed**
  - Refactor props and hooks so that the handleClose function is within confirmDialog.js
  - Rename newcustomer.js and its reference in MainRoutes.js to dataentry.js
- **Removed**
  - Remove newtemplate.js and edittemplate.js placeholders and references in
  MainRoutes.js
