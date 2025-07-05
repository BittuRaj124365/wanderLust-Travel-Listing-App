const express = require("express");
const mongoose = require("mongoose"); // requiring mongoose
const methodOverride = require("method-override"); //requiring methodOverride
const Listing = require("./models/listing.js"); //requiring listings
const ejsMate=require("ejs-mate");// requiring ejs mate
const app = express();
let port = 1705;
const path = require("path"); 
app.path("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
// to get connection with mongodb
main()
  .then((res) => {
    console.log("Connection Successful.");
  })
  .catch((err) => {
    console.log("Connection failed.", err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}
// for connection server using express
app.listen(port, (req, res) => {
  console.log(`App is listening on port ${port}.`);
  console.log("Connection b/w server and app has formed.");
});
app.get("/", (req, res) => {
  res.send("The Server is working well !!");
});
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("Listings/index.ejs", { allListings });
});
// new listing route
app.get("/listings/new",async (req,res)=>{
    res.render("Listings/new.ejs");
})
// show listings
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("Listings/show.ejs",{listing});
})
//create routing
app.post("/listings",async(req,res)=>{
    // if(!req.body.listing.image || !req.body.listing.image.url){
    //   req.body.listing.image={
    //     url:"https://i.pinimg.com/originals/45/6a/83/456a83165720517e45f48603b6678161.jpg",
    //     filename:"default"
    //   };
    // }
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // console.log(listings);
})
// edit routing
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("Listings/edit.ejs",{listing});
})
// update routing
app.put("/listings/:id",async (req,res)=>{
  // if (!req.body.listing.image || !req.body.listing.image.url) {
  //   req.body.listing.image = {
  //     url: "https://i.pinimg.com/originals/45/6a/83/456a83165720517e45f48603b6678161.jpg",
  //     filename: "default"
  //   };
  // }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
// Delete routing
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})