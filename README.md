# ![Logo](readme-resources/logo-32.png) BillUI

[![Download from Sketchpacks.com](https://badges.sketchpacks.com/plugins/BillUI/version.svg)](https://sketchpacks.com/SimonTakman/BillUI)
[![View on Sketchpacks.com](https://badges.sketchpacks.com/plugins/BillUI/downloads/total.svg)](https://sketchpacks.com/SimonTakman/BillUI)

Sketch plugin - Interactive artificial evolutionary tool in order to help you come up with design suggestions that are similar to your initial design.

## Installation
### Manual Install
1. Download [`billui.sketchplugin.zip`](https://github.com/SimonTakman/BillUI/releases/download/v1.0.0/billui.sketchplugin.zip)
2. Extract the archive
3. Install `billui.sketchplugin` for Sketch App

### Install with Sketchpacks
Click on the badge below:

<a href="https://sketchpacks.com/SimonTakman/BillUI/install">
  <img width="160" height="41" src="http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png" >
</a>

## Usage
Access the plugin from Sketch's Menu Bar:

<img src="readme-resources/shortcuts.png">

Open the GUI in order to select what parameters you want to mutate.

<img src="readme-resources/fitness_selection_v2.png">

Below is an example of usage of the plugin:

<img src="readme-resources/billui_v2.png">

## Algorithm
The algorithm is a _Genetic Algorithm_ and follows the recommendation from [`Mathworks`](https://mathworks.com/help/gads/how-the-genetic-algorithm-works.html). 

Below is a graphical representation of how the genetic algorithm works in our domain:

<img src="readme-resources/mutationflow.jpg">

## Supported Shapes
* Rectangle
* Group w/ Rectangle & Text
* Symbol of Rectangle or Group w/ Rectangle & Text

## Contributors
* [`Carl Albertsson`](https://github.com/sCarlman)
* [`Simon Takman`](https://github.com/SimonTakman)
