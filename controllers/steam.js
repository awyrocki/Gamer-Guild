const router = require("express").Router();
const Steam = require("../models/Steam")
const passport = require("passport");
const session = require("express-session");
const passportSteam = require("passport-steam");
const steamStrategy = passportSteam.Strategy;
const sessionValidation = require("../middleware/token");


const STEAM_KEY = process.env.STEAM_KEY;
const SECRET = process.env.SECRET;

const PORT = process.env.PORT;

// get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initialize Strategy
passport.use(new steamStrategy({
    returnURL: "http://localhost:4000/api/auth/steam/return",
    realm: "http://localhost:4000/",
    apiKey: STEAM_KEY
    }, 
        function(identifier, profile, done) {
            process.nextTick( function () {
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
));

router.use(session({
    secret: SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}))
router.use(passport.initialize());
router.use(passport.session());

// ? STEAM ENDPOINTS/ROUTES------------------------------------//
// where data ends up "req.user"
router.get('/',  async (req, res) => {
    try {
        const steamUser = req.user;
        if(!steamUser) throw Error("Invalid Login");
        const steamID = await steamUser._json.steamid;

        const foundSteamUser = await Steam.findOne({ steamID});

        if(foundSteamUser) throw Error("That steam account already exists");
        
        const userInfo = new Steam ({
            steamId: steamUser._json.steamid,
            userName: steamUser._json.personaname,
            avatar: steamUser._json.avatarfull
        })
        await userInfo.save();
        let ID = userInfo.steamId;
        let url = `http://localhost:3000/linking/?ID=${ID}`

        res.redirect(url)
        
    } catch (err) {
        console.log(`Error: ${err.message}`);
        res.redirect("http://localhost:3000/")
    }
});

// redirects after steam auth
router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});

router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});


// ? GET STEAM DATA FROM OUR DB with STEAMID ---------------------------------------//
router.get("/steamUser/:steamId", sessionValidation, async (req, res) => {
    try {
        const { steamId } = req.params;
        const findSteamUser = await Steam.findOne({ steamId: steamId })
        if(!findSteamUser) {
            throw Error("user not found");
        }

            let userName = findSteamUser.userName;
            let avatar = findSteamUser.avatar;
            
            res.status(200).json({
                steamId,
                userName,
                avatar,
            })

    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
        
    }
})

module.exports = router;