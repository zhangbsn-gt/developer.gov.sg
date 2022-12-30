# Running Test Cases Locally in a Development Environment

## Prerequisites

Before running the test cases, you need to install the necessary dependencies and build the site. To do this, follow these steps:

1.  Open three terminal windows.
2.  In Terminal 1, run the following command to build the site:

    ```sh
    # Jekyll only
    gem install jekyll bundler

    bundler install

    # For ruby 3.0 and above, as webrick is no longer a bundled gem in Ruby3.0
    bundle add webrick

    # Serve the files with jekyll
    bundle exec jekyll serve

    # Webpack/static files
    npm install
    ```

## Instructions

---

1.  Open three terminal windows.
2.  In Terminal 1, run the following command to build the site:

    ```sh
    npm run dev:concurrent
    ```

    This command will build the entire site under the `_site `directory.

3.  In Terminal 2, run the following command to start the development server:

    ```sh
    npm run test:server
    ```

    This command runs a web server that serves the statically built files and pages.

4.  In Terminal 3, run the following command to open the Cypress GUI:

    ```sh
    npx cypress open
    ```

    This command opens the Cypress GUI, which allows you to select and run specific test cases.

## Troubleshooting

- If you encounter any errors when running the commands above, try checking the output in the terminal for error messages.
- If the development server fails to start, make sure that the `_site` directory exists and that it contains the built files and pages for the site.
- If the Cypress GUI fails to open, make sure that the development server is running and that you have the necessary dependencies installed (e.g., Cypress).
