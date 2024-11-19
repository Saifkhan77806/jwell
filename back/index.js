const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const multers = require("multer")
const cookieSession = require('cookie-session')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('./schema/UserSchema')
const Review = require('./schema/ReviewSchema')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const axios = require('axios')
const { sendmail } = require('./sendOtp')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt')
const leonardoai =  require('@api/leonardoai');
const path = require('path')
const fs = require('fs')
require('./passport')
require("./db")
const Razorpay = require('razorpay'); 
const { v4: uuidv4 } = require('uuid');
const { sendToken } = require('./sendToken')
const {sendSubscription} = require("./sendSubscription")
const Blog = require('./schema/BlogSchema')
const Contact = require('./schema/ContactSchema')
const { errorMonitor } = require('stream')
const { uploadMultiple } = require('./middlware/imageUploader')
require('dotenv').config()
const busboy = require('busboy');

// This razorpayInstance will be used to
// access any resource from razorpay

const storages = multers.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/")
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const uploads = multers({ storage: multers.memoryStorage() })

// {
//     storage: storages
// }

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { sendContact } = require('./sendContact')

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDIANRY_SECRET_KEY,
  });

// Cloudinary storage setup for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Specify the folder in Cloudinary
    format: async (req, file) => 'png', // Support formats like jpg, png, etc.
    public_id: (req, file) => file.originalname.split('.')[0], // Use original filename as public ID
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Route for handling image upload


const razorpayInstance = new Razorpay({
    // Replace with your key_id
    key_id: process.env.RAZORPAY_KEY_ID,
    // Replace with your key_secret
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

let otp
let imageId
const RAZORPAY_KEY_ID = "rzp_live_9YDNdvLxBLmTA"
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


passport.use(new LocalStrategy({
    usernameField: 'email',  // Using 'email' instead of 'username'
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isMatch = await bcrypt.compare(password,user.password)
        console.log(isMatch)
        if(isMatch){
            console.log("check")
            console.log(user)
            return done(null, {type: user, logtype: "login"})
        }else{
            return done(null, false, { message: 'login failed.' });

        }
    } catch (err) {
        console.log("err")
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    done(null, user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, auth headers, etc.)
    sameSite: 'secure'
}));


app.options('*', (req, res) => {
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No Content
});




app.use(cookieSession({
    name: "googleauthsession",
    keys: ["key1", "key2"],
    saveUninitialized: false,
    expires: new Date(Date.now() + (60 * 24 * 3600000)),
    resave: false,
    cookie: {
        secure: false,  // Set to true in production if using HTTPS
        httpOnly: true,
        sameSite: 'none'  // Allow cross-origin requests
    }
}))

app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())

// Other middleware and routes...

app.post("/uploads", uploadMultiple, (req,res)=>{
    res.status(200).send({
        message: "file uploaded successfully",
        data: req.files, 
        success: true

    })
})

app.get('/', (req, res) => {
    res.send(
        "<button><a href='/auth'>Login with google</a></button><br/><button><a href='/linkedin'>Login with linkedin</a></button> <br /> <button><a href='/logout'>Logout</a></button>"
    )
})

app.get('/auth', passport.authenticate('google', {
    scope: ["email", "profile"]
}))

app.get('/linkedin', passport.authenticate('linkedin'));




app.get('/auth/callback', passport.authenticate("google", {
    successRedirect: "/linkedin/success",
    failureRedirect: "/linkedin/failure"
})
);
app.get('/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: `/linkedin/success`,
    failureRedirect: "/linkedin/failure"
}))

let token

app.get('/linkedin/success', (req, res) => {
    // if (!req.user) {
    //     res.redirect("/linkedin/failure")
    // // }
     token = jwt.sign({ id: req.user, data: "data" }, 'your-secret-key', {
        expiresIn: '1d' // Token expiry (e.g., 1 day)
    });
    // console.log(req)

    res.redirect(`${process.env.FORNTEND_URL}/`)
    // res.redirect(`/data`)
    // res.status(200).send({token})

})

app.get('/linkedin/failure', (req, res) => {
    res.status(404).send("Error")
})

app.post('/upload', upload.single('image'), (req, res) => {
    try {
      // File has been uploaded to Cloudinary at this point
      console.log(req.file); // The file info stored in Cloudinary
  
      res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: req.file.path, // The URL of the uploaded file on Cloudinary
      });
    } catch (error) {
      console.error('Error during upload:', error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  });
  


app.post("/verify-token",async(req,res)=>{
    const {token} = req.body
    const user = await jwt.verify(token, 'your-secret-key')
    
    res.status(200).send({user})
})

// success

app.get("/data", (req, res) => {
    // console.log("check",req.user)
    // const {token} = req.params
    const tkens = token
    res.status(200).send({token: tkens })
    token = null
    // res.redirect("https://server-ten-orcin.vercel.app/")
})

app.get("/userid/:email", async (req, res) => {
    const { email } = req.params;

    const userData = await User.findOne({ email })

    if (userData) {
        res.status(200).json({ success: true, msg: "user found", userData })
    }
    else {
        res.status(202).json({ success: false, msg: "user not found !" })
    }
})

app.post("/update-user/:id", async (req, res) => {
    const { id } = req.params

    await User.findOneAndUpdate({ id }, req.body).then(() => {
        res.status(200).send("user updated successfully")
    }).catch((err) => {
        res.status(404).send(err)
    })

})

app.post("/send-otp", async(req,res)=>{

    try{
        const {email} = req.body;
        const user = await User.findOne({email});
    
        if(!user){
            res.status(200).send({msg:"invalid Email"});
        }else{
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            console.log(`otp from mail side :- ${otp}`);
             sendmail(otp, email);
            res.status(200).send({msg: user._id, otp})
        }
    }catch(err){
        res.status(404).send(err)
    }
   
})

app.post("/verfiy-otp", async(req,res)=>{
    const {userOtp, email} = req.body

   const user =  await User.findOne({email})

   if(!user){
    res.status(200).send({msg: "uset not found", success: false})
    return
   }

  const isCorrectOtp =  jwt.verify(user.verifyOtp, 'your-secret-key')

  if(isCorrectOtp.otp == userOtp){
    console.log("otp is correct")
    res.status(200).send({success: true})
  }else{
    res.status(200).send({msg: "invalid otp"})
  }
})

app.get('/auth/callback/success', (req, res) => {
    if (!req.user) {
        res.redirect("/auth/callback/failure")
    }
    // console.log(req.user)
    res.status(200).send(req.user)
})

app.post('/setinfo/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, password, phone, country } = req.body

    res.setHeader("Access-Control-Allow-Credentials", "*")
    res.setHeader("Access-Control-Allow-Origin", `${process.env.FORNTEND_URL}`);

    const hashedPss = await bcrypt.hash(password, 10)


    await User.findOneAndUpdate({ id }, { firstName, lastName, password: hashedPss, phone, country }).then((e) => {
        res.status(200).json({ success: true, info: e })
    }).catch((err) => {
        console.log(err)
    })

})

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect(`${process.env.FORNTEND_URL}/login`)
    });
})

app.post("/register",async (req,res)=>{
    const {email,profile,country,firstName,lastName,phone, password} = req.body
    const ids = uuidv4();

    

    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(404).send({success: false, msg: "user already exist"})
    }

    const hashedPss = await bcrypt.hash(password, 10)

   const userData =  await User({name: "manualUser",email,profile,id: ids,provider: "manual",country,firstName,lastName,phone, password: hashedPss})

   await userData.save()

   token = jwt.sign({ id: {type: {name: "manualUser",email,profile,id: ids,provider: "manual",country,firstName,lastName,phone, password: hashedPss}, logtype: "login"}, data: "data" }, 'your-secret-key', {
    expiresIn: '1d' // Token expiry (e.g., 1 day)
});
res.status(200).send({msg: "user saved successfully", user: {name: "manualUser",email,profile,id: ids,provider: "manual",country,firstName,lastName,phone, password: hashedPss}, token})
token = null

})


app.post('/manual-login', (req, res, next) => {
    try{
        res.setHeader("Access-Control-Allow-Methods", "*")
        console.log('Request received on /manual-login');  // Debug log to see if route is hit
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                console.log('Error during authentication:', err);  // Log errors
                return next(err);
            }
            if (!user) {
                console.log('invalid credentials:', info.message);  // Log failure reason
                return res.redirect('/login/failure');
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log('Error during login:', err);  // Log login error
                    return next(err);
                }
                token = jwt.sign({ id: req.user, data: "data" }, 'your-secret-key', {
                    expiresIn: '1d' // Token expiry (e.g., 1 day)
                });
                console.log('Authentication successful');  // Log success
               return res.status(200).send({msg: "logged", user: req.user, token})
            });
        })(req, res, next);
    }catch(err){
        console.log(err)
    }
});

app.post("/loginmy", async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email})

    
    if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            token = jwt.sign({ id: {type: user, logtype: "login"}, data: "data" }, 'your-secret-key', {
                expiresIn: '1d' // Token expiry (e.g., 1 day)
            });
            res.status(200).send({msg: "logged", user, token})
            token = null
        }else{
            res.status(200).send({msg: "pass login failed", success: false})
        }
    }else{
        res.status(200).send({msg: "pass email failed", success: false})
    }

})


app.post('/verified/:email', async (req,res)=>{
    const {email} = req.params
    await User.findOneAndUpdate({email}, {verified: true}).then(()=>{
        res.status(200).send({msg: "user verified"})
    }).catch((err)=>{
        console.log(err)
    })
});

// Login failure route
app.get('/login/failure', (req, res) => {
    res.status(401).send("Login failed");
});

app.get("/cookie",(req,res)=>{
    res.status(200).json({ regsiteration: "resgister"});
})

app.post("/text",async (req,res)=>{
    const {msg, noImG, email} = req.body

    console.log({msg, noImG, email})
   
leonardoai.auth(process.env.LEAONARDO_API_KEY);
leonardoai.createGeneration({
//   alchemy: true,
//   height: 768,
//   modelId: '6b645e3a-d64f-4341-a6d8-7a3690fbf042',
  num_images: Number(noImG),
//   presetStyle: 'DYNAMIC',
  prompt: msg,
//   width: 1024
modelId: "6b645e3a-d64f-4341-a6d8-7a3690fbf042",
  contrast: 3.5,
//   prompt: "an orange cat standing on a blue basketball with the text PAWS",
//   num_images: 4,
  width: 1472,
  height: 832,
  ultra: true,
  styleUUID: "111dc692-d470-4eec-b791-3475abac4c46",
  enhancePrompt: false
})
  .then(async({ data }) => {

    console.log(data.sdGenerationJob.generationId)

    if(email){
        await User.findOneAndUpdate({email}, {id: data.sdGenerationJob.generationId}).then(()=>{
            console.log("id stored successfully")
            res.status(200).send({data: "id stored successfully", id: data?.sdGenerationJob?.generationId})
        }).catch((err)=>{
            console.log("err in updating",err)
        })
    }else{
        res.status(200).send({data: "id generated successfully", id: data?.sdGenerationJob?.generationId})
    }

    
  }
   

)
  .catch(err => 
  {
    res.status(200).send(err)
  }
  );
})


app.get("/re",async(req,res)=>{

    const id = await User.findOne({email: "khansaif86783@gmail.com"})

    console.log("from id",id.id)
    const ids = id.id

    const {data} = req.body

leonardoai.auth(process.env.LEAONARDO_API_KEY);
let statu = "PENDING"
// while(statu === "PENDING"){
    console.log(statu, "epep")
    leonardoai.getGenerationById({id: data})
    .then(({ data }) => {
        // console.log({id})
        console.log(data.generations_by_pk.status)
    
         statu = data.generations_by_pk.status
         console.log(statu)
    
        if(data.generations_by_pk.status=="COMPLETE"){
          statu = "COMPLETE"
        }
    
        // if(data.status)
        res.status(200).json({data})
    }
    )
    .catch(err => console.error(err));
// }

})   


app.post("/enhance",async(req,res)=>{
    const {prompt} = req.body

    leonardoai.auth(process.env.LEAONARDO_API_KEY);
    leonardoai.promptImprove({prompt})
    .then(({ data }) => {
        console.log(data)
    res.status(200).send({data})
    })
    .catch(err => console.error(err));
})

app.post("/update-credit",async(req,res)=>{
    const {email,credits} = req.body

    console.log(email, credits)

   const user =  await User.findOne({email})

   let acCredit

   if(user.credits< user.partcredit){

    if(user.partcredit < credits){
         acCredit = parseInt(user?.partcredit)
    }else{
         acCredit = parseInt(user.partcredit - credits)
    }

    console.log(acCredit, "this is actual that is want to add in the userSchema from partner-credit")

    User.findOneAndUpdate({email}, {partcredit: acCredit}).then((data)=>{
        res.status(200).json({msg:" credite updated successfully", success: true})
    }).catch((err)=>{
        console.log(err)
        res.status(200).json({msg: "err in updating credits", err})
    })
   }else{
    if(user.credits < credits){
        acCredit = parseInt(user.credits)
   }else{
        acCredit = parseInt(user.credits - credits)
   }
    console.log(acCredit, "this is actual that is want to add in the userSchema from user credit")

    User.findOneAndUpdate({email}, {credits: acCredit}).then((data)=>{
        res.status(200).json({msg:" credite updated successfully", success: true})
    }).catch((err)=>{
        console.log(err)
        res.status(200).json({msg: "err in updating credits", err})
    })
   }
})

app.post("/addcredits", async(req,res)=>{
    const {email,credits} = req.body;

    console.log(email, credits)

   await User.findOneAndUpdate({email}, {credits}).then((data)=>{
    sendToken(email, credits)
        res.status(200).json({msg:" credite updated successfully", success: true})
    }).catch((err)=>{
        console.log(err)
        res.status(200).json({msg: "err in updating credits", err})
    })


})

app.post("/history", async(req,res)=>{
    const {imgurl, prompts, email} = req.body;
    const userData = await User.findOne({email})
    if(userData){
        imgurl.map(async(el)=>{
         const user = await userData.addhistory(el?.url, prompts)
        })
        await userData.save()
    }
    res.status(200).send({imgurl, prompts})
})

app.post("/payment", async(req,res)=>{
    const {amount,currency,receipt, notes}  = req.body;      
        console.log({amount,currency,receipt, notes})
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          //STEP 3 & 4: 
          if(!err){
            console.log(order)
            res.json(order)}
          else{
            res.send(err);}
        }
    )
})

app.post('/verify-payment', async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log({ razorpay_order_id, razorpay_payment_id, razorpay_signature })

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Payment is verified
            console.log("Payment verified successfully")

            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            console.log("Invalid payment signature")
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


app.post("/credit-null",async (req,res)=>{
    const {email} = req.body;

    await User.findOneAndUpdate({email}, {subscription: null, credits: 0, expires: "subscription expired"}).then(()=>{
        res.status(200).send({msg : "subscriptions and credit stored successfully"})
        
    }).catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    })

})

app.post("/subscription", async(req,res)=>{
    const {subscription, credits, email, type} = req.body;

    function getDateWithIncreasedMonth() {
        let today = new Date(); // Get today's date
        // Create a new Date object with the month increased by 1
        let nextMonthDate = new Date(today.setMonth(today.getMonth() + 1));
    
        return nextMonthDate;
    }

    function getDateWithIncreasedYear(){
        {
            let today = new Date(); // Get today's date
            // Create a new Date object with the month increased by 1
            let nextMonthDate = new Date(today.setFullYear(today.getFullYear() + 1));
        
            return nextMonthDate;
        }
    }

    const dat = type == "m" ? getDateWithIncreasedMonth() : getDateWithIncreasedYear()
    
    // Example usage

    sendSubscription(email, subscription, dat, credits)
    await User.findOneAndUpdate({email}, {subscription, credits, expires: type == "m"?getDateWithIncreasedMonth(): getDateWithIncreasedYear()}).then(()=>{

        res.status(200).send({msg : "subscriptions and credit stored successfully"})
        
    }).catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    })

})

app.get("/getuser", async(req,res)=>{
    const user = await User.find({},{password:0})
    res.status(200).send({user})
})

app.get("/byemail/:email", async(req,res)=>{
    const {email} = req.params;
    const user = await User.findOne({email})
    res.status(200).send({user})
})


app.post("/post-blog",async(req,res)=>{
    console.log(req.body)
    try{
        const blog = await Blog(req.body)
        await blog.save()
        res.status(200).send({msg: "blog add successfully"})
    }catch(err){
        console.log(err)
    }
})

app.get("/get-blog/:id",async(req,res)=>{
    const {id} = req.params
   const blog = await Blog.findById(id)
   res.status(200).send({blog})
})

app.get("/all-blog",async(req,res)=>{
    const blog = await Blog.find()
    res.status(200).send({blog})
})

app.post("/contacus",async(req,res)=>{
    const {names, email, subject, message} = req.body

    console.log({names, email, subject, message})

    sendContact(email, names, message, subject)
    res.status(200).send({msg: "complain send successfully !"})
})

app.get("/contact", async(req,res)=>{
    const contacts = await Contact.find()

    res.status(200).send({contacts})
})

app.post("/post-review",async (req,res)=>{
    try{
        const { name, profile, rates, message } = req.body
        const reviewData = await Review({ name, profile, rates, message })
        await reviewData.save()

        res.status(200).send({msg: "review stored successfully" })
    }catch(err){
        res.status(404).send(err)
    }
})


app.get("/get-review",async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:5173");
    const reviewData = await Review.find()
  
    res.status(200).send(reviewData)
  })


app.delete("/delete-review/:id",async(req,res)=>{
    const {id} = req.params

    await Review.findByIdAndDelete(id)

    res.status(200).send({msg: "review deleted successfully !"})
})
  
// const mongoose = require('mongoose');
app.post("/update-review", async (req, res) => {
    const { id } = req.body;

  
    try {
         await Review.findByIdAndUpdate(id,{approve: true})
        // if (updatedReview.modifiedCount === 0) {
        //     return res.status(404).send({ msg: "Review not found!" });
        // }

        res.status(200).send({ msg: "Review updated successfully!" });
    } catch (err) {
        console.error("Error during update:", err);
        res.status(500).send({ msg: "Server error" });
    }
});




app.get('/auth/callback/failure', (req, res) => {
    res.send("Error")
})

app.post("/sendPartCredits",async(req, res)=>{
    const {email, credits} = req.body;

    await User.findOneAndUpdate({email}, {partcredit: credits}).then(()=>{
        console.log("partner credits send successfully")
        res.status(200).send("partner credits send successfully")
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/resUser",  async(req,res)=>{
    User.find({})
    .select('firstName' ) // Include firstname field
    .select('email' )
    .select('profile')
    .then(users => {
      res.json(users); // Send users data to the frontend
    })
})

app.post("/sendMember",async(req, res)=>{
    const {member, email} = req.body;

    const user = await User.findOne({email})

        await User.findOneAndUpdate({email}, {member}).then(()=>{
            console.log("partner member send successfully")
            res.status(200).json({msg:`partner member send successfully for ${email}` })
        }).catch((err)=>{
            console.log(err)
        })
    
})


app.post("/member-null",async(req,res)=>{
    const {email} = req.body;
    let isLeader = false

    await User.findOne({email}).select("-history").then((user)=>{

        user?.member?.map((el) =>{
            if(el?.type=='leaders' && email == el?.email){
                isLeader = true
            }
        })

        if(isLeader){
            user?.member?.map(async(el)=>{
                await User.findOneAndUpdate({email: el?.email}, {subscription:  null, member: null, expires: null, partcredit: 0}).then(()=>{
                    console.log(el?.email, " member is set to be null" )
                }).catch((err)=>{
                    console.log(err)
                })
            })
        }

        res.status(200).send(user)
        
    }).catch((err)=>{
        res.status(404).send(err)
    })
})

app.post("/change-password", async(req,res)=>{
    const {email, oldpass, newpass, confpass} = req.body

    console.log({email, oldpass, newpass, confpass})

    const user = await User.findOne({email})

    const isMatch = await bcrypt.compare(oldpass, user.password)

    console.log(isMatch)

    if(isMatch){
       if(newpass == confpass){
        const password = await bcrypt.hash(newpass, 10)
        await User.findOneAndUpdate({email}, {password}).then(()=>{
            res.status(200).json({msg: "password changed successfully !", success: true})
        })
       }else{
        res.status(200).json({msg: "please write new pasword and confirm password as same as !", success: false})
       }
    }else{
        res.status(200).json({msg: "password is wrong !", success: false})
    }

})

app.post("/adlogin", async (req,res)=>{
    const {email, password} = req.body

    if(email == process.env.ADMIN_EMAIL_1){
        if(password == process.env.ADMIN_PASSWRD_1){
           const tok = jwt.sign({ email }, 'your-secret-key', {
                expiresIn: '1d' // Token expiry (e.g., 1 day)
            });
            console.log('Authentication successful');  // Log success
           return res.status(200).send({msg: "admin 1 login", token: tok})
        }else{
            console.log('Authentication failed');
            return res.status(200).send({msg: "login failed" , success: false})
        }
    }else if(email == process.env.ADMIN_EMAIL_2){
        if(password == process.env.ADMIN_PASSWRD_2){
           const tok = jwt.sign({ email }, 'your-secret-key', {
                expiresIn: '1d' // Token expiry (e.g., 1 day)
            });
            console.log('Authentication successful');  // Log success
           return res.status(200).send({msg: "admin 1 login", token: tok})
        }else{
            console.log('Authentication failed');
            return res.status(200).send({msg: "login failed" , success: false})
        }
    }else{
        console.log('Authentication failed');
        return res.status(200).send({msg: "login failed" , success: false})
    }

})


app.post("/adverify", async (req,res)=>{
    const {token} = req.body
    const user = await jwt.verify(token, 'your-secret-key')
    
    res.status(200).send({user})
})

app.post("/chg-otp", async (req,res)=>{
    const {email} = req.body

   const otps = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    console.log(`otp from mail side :- ${otps}`);
     sendmail(otps, email);

    const tok = jwt.sign({ otp: otps, data: "data" }, 'your-secret-key', {
        expiresIn: '1h' // Token expiry (e.g., 1 day)
    }); 

    await User.findOneAndUpdate({email}, {verifyOtp: tok})

    res.status(200).send({msg: "otp send successfully", otp: tok, success: true})

})

app.post("/chg-verify",async (req,res)=>{
    const {otp, email, password, cofpassword} = req.body

   const user =  await User.findOne({email})

   if(!user){
    res.status(200).send({msg: "uset not found", success: false})
    return
   }

  const isCorrectOtp =  jwt.verify(user.verifyOtp, 'your-secret-key')

  if(isCorrectOtp.otp == otp){
    console.log("otp is correct")

    if(password != cofpassword){
        res.status(200).send({msg: "please write confirm password and password as same as !", success: false})
        return
    }

    const pass = await bcrypt.hash(password, 10)

    await User.findOneAndUpdate({email}, {password: pass}).then(()=>{
        res.status(200).send({msg: "password is success fully", success: true})
    }).catch((err)=>{
        console.log(err)
    })

  }else{
    res.status(200).send({msg : "your Otp is incorrect", success: false})
  }


})


const XMLHttpRequest = require('xhr2')

const uploadDatasetImage = async (files, response) => {
    console.log("i am inside function")
	const rawFields = response?.fields;
	const fields = JSON.parse(rawFields);
	const url = response?.url;

    console.log("id:", response?.id)


	const formData = new FormData();

    const file = files?.buffer

    console.log("file buffer", file)

	Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
    
    //   const request = new XMLHttpRequest();
    //   request.open('POST', url);
    // request.onload = () => {
    //     if (request.status >= 200 && request.status < 300) {
    //       console.log("Image uploaded successfully.");
    //       resolve(request.response);
    //     } else {
    //       console.error(`Failed to upload image: ${request.statusText}`);
    //       console.log(`Failed to upload image: ${request.statusText}`);
    //     }
    //   };
  
    //   request.onerror = () => reject("An error occurred during the upload");
  


    // console.log("request posting ended")
	// const result = await request.send(file);
    // console.log("send formData")


    await axios.post(url, formData).then((res)=>{
        console.log("image upload succeesfully", res.status)
    }).catch((err)=>{
        console.log("this is from axios err", err)
    })
}

app.get("/getimg/:id",(req,res)=>{
    const {id} = req.params
    console.log("params:". id)
    leonardoai.auth(process.env.LEAONARDO_API_KEY)
                leonardoai.getGenerationById({id})
                .then(({data}) => {
                        console.log("i am inside the status")
                        console.log("status:",data)
                        res.status(200).json({data})
                })
                .catch(err => console.error(err));
})

// Backend API endpoint to receive file from frontend and upload to S3
app.post('/dataset-image', uploads.single('file'), async (req, res) => {
    
    console.log("the propmt:", req.body.msg)
    console.log("the no of img:", req.body.noImG)
    console.log("the email:", req.body.email)

	try {
        res.setHeader("Access-Control-Allow-Origin", `http://localhost:5173`);
		const file = req.file;
        console.log("File:", file)
		// 1. Obtain pre-signed URL and fields from an API (assumed to be your backend method)

        const extensionArr = file.originalname.split(".")

        const extension = extensionArr[extensionArr.length-1]

        console.log("Extension:", extension)

        let response

        leonardoai.auth(process.env.LEAONARDO_API_KEY);
        leonardoai.uploadInitImage({extension})
        .then(({ data }) => {
            // console.log("init id:",data)
            response = data?.uploadInitImage
            console.log("init id:", data?.uploadInitImage?.id)
		 uploadDatasetImage(file, data?.uploadInitImage);
         axios.post("http://localhost:3000/text", { msg: req.body.msg, noImG: 1, email: req.body.email }).then((res)=>{
            console.log("this geneation id:",res.data)
            const id = res.data?.id
            console.log("this is id", id)
            let status = true
            // while(status == true){
                console.log("in loop")
                axios.get(`http://localhost:3000/getimg/${id}`).then((response)=>{
                    if(response.data?.data?.generations_by_pk?.status == "COMPLETE"){
                        status = false
                        console.log("generated img:", response.data?.data?.generations_by_pk)
                    }
                        console.log("generated img status:", response.data?.data?.generations_by_pk?.status)
                }).catch((err)=>{
                    console.log(err)
                })
                
            // }

           

         }).catch((err)=>{
            console.log("there is err from id generation")
         })
        })
        .catch(err => console.error(err));


        console.log("excueting ended")

		res.json({ message: 'File uploaded successfully' });
	} catch (error) {
		console.error('Error uploading file:', error);
		res.status(500).json({ error: 'Failed to upload image' });
	}
});




// The uploadDatasetImage function here should be the same as defined earlier









app.listen(process.env.PORT, () => {
    console.log("server is running")
})