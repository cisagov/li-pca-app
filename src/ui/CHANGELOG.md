# Changelog #

All notable changes to this project will be documented in this file.
Changes begin after deviation from the original Berry template.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] ##

## [0.0.1] - 2022-02-09 ##

### Added ###

- GENERATE_SOURCEMAP=false to "scripts" - "start" command in package.json
- lipca_logo.png to src/assets/images

### Changed ###

- "react-scripts" version from 4.0.3 to 5.0.0 in package.json
- secondary colors to other colors in src/assets/scss/_themes-vars.module.scss
- svg file to a real image in src/ui-component/Logo.js

### Removed ###

- "airbnb" package from .eslintrc
- removed sign in capability with Google in AuthLogin.js and AuthRegister.js in
src/views/pages/authentiation/auth-forms

## [0.0.2] - 2022-02-10 ###

### Added ###

- templates, landing-pages, sending-profiles,
campaigns folders created with their own index.js in src/views

### Changed ###

- sample-page view is now called customer along with all its references
- image used for User1 in src/layout/MainLayout/Header/ProfileSection/index.js

### Removed ###

- removed search and notification buttons in the index.js and their folders in
src/layout/MainLayout/Header/
- removed unneeded text and cards and their imports in the profile pop down in
src/layout/MainLayout/Header/ProfileSection/index.js

## [0.0.3] - 2022-02-11 ##

## Added ##

- in src/ui-component, created EnhancedTable.js and added it to campaigns index

## Changed ##

- in package.json, changed the name, version, and homepage
- in config.js, changed the basename and defaultPath
- in README.md, modified to include Li-PCA info
- in public folder, replaced the favicon and imported it in index.html

## Removed ##

- commented out useTheme in src/ui-component/Logo.js
- Removed logos and google icons from src/asset
- Removed importing utilities and dashboard from src/layout/menu-items/index.js,
src/routes/MainRoutes.js, and their folders in src/views
- public/index.html removed some meta tags
