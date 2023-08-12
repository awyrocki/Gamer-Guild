const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const passportSteam = require("passport-steam");
const steamStrategy = passportSteam.Strategy;
const axios = require("axios")
const { url } = require("inspector");


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
        
        let url = `http://localhost:3000/?ID=${steamID}`

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

// access to player summaries with steam id
router.get("/steamUser/:steamId", async (req, res) => {
        const { steamId } = req.params;
        await axios({
            url: ` http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${steamId}`,
            method: "get",
        })
        .then(response=> res.status(200).json( response.data ))
        .catch((err) => res.status(500).json({ message: `no data: ${err}` }))

})

module.exports = router;