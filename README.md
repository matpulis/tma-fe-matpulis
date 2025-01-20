# Front-End Assessment

## Introduction

Thank you for taking the time to go through my project submission. I hope that I have filled all of your requirement criteria and a little bit extra 🤖.

I wanted everything on the screen to have a purpose, so I added some more routes and functionality to round up and get as close to a completed product as possible without going overboard. I did not use any UI component libraries and wrote all of the components myself to demonstrate my deep understanding of modern front-end frameworks and concepts.

##### Additional features implemented:

- Central State Management: Integrated NgRx and Signals Store for streamlined state management.
- Mock Authentication: Added a login page with a mock authentication store.
- Route Guards: Added route guards for authentication.
- Shopping Cart: Developed a fully functioning shopping cart feature with voucher support.
- Additional Pages: Included an FAQs page and a Terms and Conditions page to ensure there are no broken links in the interface.

## Technologies Used

- Angular: The latest version for building the front end.
- TypeScript: For type safety and modern JavaScript features.
- RxJS: For reactive programming and countdown functionality.
- Apollo GraphQL: For GraphQL API communication.
- Tailwind/SCSS: For styling and responsive design.
- NgRx/Signals Store: For state management.

## Third-party libraries used:

- JS Confetti: https://www.npmjs.com/package/js-confetti
- Line Icons: https://lineicons.com

## Route list

- `/` - Homepage with a rotating hero banner, popular category, and product lists.
- `/browse` - Browse the product selection in a paginated interface with category filter and sorting support.
- `/products/:category_slug/:product_id/:products_slug` - View product page with Add to cart and show related product.
- `/shopping-cart` - View items currently in your shopping cart
- `/order-confirmation` - Order confirmation screen
- `/faqs` - Frequently asked questions page
- `/terms-conditions` - Mock terms and conditions page
- `/privacy-policy` - Mock privacy policy page

## Headless CMS

I used Hygraph as my headless CMS, created all of the models and needed relationships, and seeded it with some initial dummy data. The URS is saved in the environment files, so the project should just work after an npm install and ng-serve I tested it. 😉

Ok, enough talk...

## Getting Started

### Prerquisites

- Node.js (LTS version recommended) I used v22.12.0.
- Angular CLI: I used v 19.1.2

### Installation

1. Clone the repository:
      `bash
   git clone https://github.com/matpulis/tma-fe-matpulis
   cd tma-fe-matpulis
   `

2. Install dependencies:
      `bash
   npm install
   `

### Running the Application

1. Start the development server:
      `bash
   ng serve
   `

2. Open the application in your browser at [http://localhost:4200](http://localhost:4200).

Thanks again for reviewing this project!
If you have any questions or suggestions, please reach out.
