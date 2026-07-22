import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;
const baseURL = "https://dog.ceo/api/";

app.set("view engine", "ejs");

app.use(cors());

app.use(bodyParser.urlencoded({extended:true})); //for body data

app.use(express.static("public")); //for css file

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

//sare dogs ke name 
app.get("/breeds", async (req, res) => {
    try{
        const response = await axios.get(`${baseURL}breeds/list/all`);
        res.render("breedPage.ejs",{breeds : response.data.message});
    }catch(error){
        res.status(500).send(error.message);
    }
});

//random image kisi bhi dog ki
app.get("/random", async (req, res) => {
    const luckyThought = dogThoughts[Math.floor(Math.random() * dogThoughts.length)];
    try{
        const response = await axios.get(`${baseURL}breeds/image/random`);
        res.render("random.ejs",{imageLink : response.data.message,dogThought :luckyThought});
    }catch(error){
        res.status(500).send(error.message);
    }
});

//breed ki picture
app.get("/explore/:name", async (req, res) => {
    const breed = req.params.name;
    try{
        const response = await axios.get(`${baseURL}breed/${breed}/images`)
        const pick = Math.floor(Math.random()*response.data.message.length)
        res.render("explore.ejs",{imageLink : response.data.message[pick],breed:breed});
    }catch(error){
        res.status(500).send(error.message);
    }
});

//sub breads ki list for particular breed
app.get("/subbreeds/:name",async(req,res)=>{
    const breed = req.params.name;
    try{
        const response = await axios.get(`${baseURL}breed/${breed}/list`)
        res.render("subBreeds.ejs",{sub: response.data.message,breed:breed});
        console.log(response.data.status);
    }catch(error){
        res.status(500).send(error.message);
    }
})

//sub bread ki images ke liy
app.get("/subbreeds",async(req,res)=>{
    const breed = req.query.name;
    const subBreed = req.query.sub;
    try{
        const response = await axios.get(`${baseURL}breed/${breed}/${subBreed}/images`)
        const pick = Math.floor(Math.random()*response.data.message.length)
        res.render("breedExplore.ejs",{imageLink : response.data.message[pick],breed:breed,subBreed:subBreed});
        console.log(response.data.status);
    }catch(error){
        res.status(500).send(error.message);
    }
})

//Server listening on port 3000
app.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}`);
})











const dogThoughts = [
  " Every wag tells a happy story.",
  " Life is better with muddy paws.",
  " A dog doesn't care who you are, only that you're there.",
  " Happiness is a sunny walk with your best friend.",
  " Throw the ball, not the friendship.",
  " Every dog is someone's whole world.",
  " Treats are temporary, love is forever.",
  " Dogs leave paw prints on our hearts forever.",
  " A wagging tail is the purest smile.",
  " Some angels choose four paws instead of wings.",
  " Home is wherever your dog runs to greet you.",
  " Dogs make ordinary days extraordinary.",
  " Every pup deserves endless belly rubs.",
  " Keep calm and pet a dog.",
  " Every bark hides a little adventure.",
  " The world is brighter with happy pups.",
  " Love comes with four paws and a wet nose.",
  " Small paws, giant hearts.",
  " Dogs teach us joy without saying a word.",
  " A loyal dog is life's greatest gift.",
  " One wag can make a bad day better.",
  " Dogs don't judge, they just love.",
  " Sweet dreams begin with a sleepy puppy.",
  " Every tail wag is a little celebration.",
  " Dogs remind us to enjoy the little moments."
];
