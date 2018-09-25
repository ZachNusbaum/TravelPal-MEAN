# Project Notes
---

Zach Nusbaum

## Comments about angular:

* !! Because of CORS, app will only run on http://localhost:4200 or https://zachdn.us unless you replace API Keys with your own.

* All of the code that I wrote lives in the [```./src/app```](/src/app) directory.

* ```./src/app/*.service.rs``` files define the methods used to access the different API endpoints.

* Global CSS styles are in [```./src/styles.css```](/src/styles.css)

* Each sub-directory of [```./src/app```](/src/app) is a component. Inside of each component folder is a typescript file, and html file, and a css file.

* To run/compile the project, make sure you have NPM and Angular CLI (v6) installed.

* Run the project locally by opening the folder with the command line and typing: ```ng serve --open```

* Compile the project by running ```ng build --prod```. The compiled project will be found inside of the ```./dist``` directory.

## What I would have done differently

* ~~I would have organized the components for ride share comparison feature into their own module (like i did with the places feature).
E.g. i would have placed ```app/lyft-prices```, ```app/price-lists```, ```app/uber-prices```, ```app/lyft-prices```, and ```app/ride-share-form``` into ```app/ride-share/...```~~

## Things to still do:

* Cache API responses

## Diagrams

__Ride Share Comparison Feature__

![Ride Share Feature Diagram](/ride-share-diagram.png)

__Places Feature__

![Places Feature Diagram](/places-diagram.png)