import express from "express"; 
import bodyParser from "body-parser";
import axios from "axios"; // Importing Axios for making HTTP requests

const app = express(); 
const port = 5000; 

// Middleware setup
app.use(express.static("public")); // Serving static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true })); // parse URL-encoded request bodies

// Handling GET requests to the root endpoint '/'
app.get("/", async (req, res) => {  // Making an asynchronous GET request to a random activity API endpoint
  try {    
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data; // Extracting the response data
    console.log(result); // Logging the result to the console

    // Rendering an EJS template 'index.ejs' with the retrieved data
    res.render("index.ejs", { data: result });
  } catch (error) {
    // Handling errors if the request fails
    console.error("Failed to make request:", error.message);
    // Rendering the 'solution.ejs' template with an error message
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

// Handling POST requests to the root endpoint '/'
app.post("/", async (req, res) => {
  try {
    console.log(req.body); // Logging the request body to the console
    const type = req.body.type; // Extracting 'type' parameter from the request body
    const participants = req.body.participants; // Extracting 'participants' parameter from the request body
    // Making an asynchronous GET request to a filtered activity API endpoint
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data; // Extracting the response data
    console.log(result); // Logging the result to the console
    // Rendering an EJS template 'solution.ejs' with a random activity from the filtered result
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    // Handling errors if the request fails
    console.error("Failed to make request:", error.message);
    // Rendering the 'index.ejs' template with a specific error message
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

// Starting the server and listening on specified port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
