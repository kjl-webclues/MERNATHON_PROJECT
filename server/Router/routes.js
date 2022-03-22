const express = require('express');
const router = express.Router();
const Admin = require('../ModelSchema/adminSchema');
const Genres = require('../ModelSchema/genresSchema');
const authenticate = require('../middleware/checkAuth');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const path = require('path');

//================================== For Register User ===================================//
router.post('/signUp', async (req, res) => {
    const {user, genres} = req.body
    // console.log("user", user);
    // console.log("genres", genres);

    try {
        const usernameExist = await Admin.findOne({userName: user.userName})
        const emailExist = await Admin.findOne({ email: user.email })
        if (emailExist) {
            res.send("Email already Exists")
        } else {
            const result = await Admin(user).save();
            await Admin.updateOne({userName: user.userName }, {$push: {genres: genres}})
            res.send("Register Sucessfully")
        }
    }
    catch (err) {
        console.log(err);
        res.send("error" + err)
    };
})

//================================== For Login User ===================================//
router.post('/signIn', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
    //    console.log(req.body);
        //user Exist
        const userLogin = await Admin.findOne({ email: email });

        if (userLogin) {
            const validate = await bcrypt.compare(password, userLogin.password);

            if (!validate) {
            res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("jwtLogin", token , {
                    expires: new Date(Date.now() + 1 * 3600 * 1000),
                });
                //============================= Send Login User =============================
                res.send({msg: "User Login Successfully!"});
            }
        
        } else {
            res.status(400).send({ error: "Invalid Credientials!" });
        }

    } catch (err) {
        console.log(err); 
    }
})

//================================== For get User Profile ===================================//
router.get('/getUserProfile', authenticate, async (req, res) => {
    try {
       const LoginUser = req.authenticateUser
        // console.log("LoginUser", LoginUser);
        res.send({LoginUser})
    } catch (err) {
        console.log(err);
    }
})

//================================== For Update User Profile ===================================//
router.put('/updateUserProfile/:id/:email', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const updateValue = req.body;
        const email = req.params.email;

        await Admin.findByIdAndUpdate(id, updateValue, { new: true });
        res.json('Profile Updated Successfully!')
        
    } catch (err) {
        console.log(err);
    }
})

//================================== For Update Artist Profile ===================================//
router.put('/updateArtistProfile/:id', authenticate, async (req, res) => {
    try {
        const genres = req.body.checkGenres;
        
        const {_id, firstName, lastName, email, bio, userName, password, role} = req.body.values;

        const updatedValues = {
            _id, firstName, lastName, email, bio, userName, password, role, genres
        }
           
        const updatedUser = await Admin.findOneAndUpdate({_id: req.params.id}, updatedValues , {
            new: false
        });
        res.json("Artist Profile Updated Succesfully!")
    } catch (err) {
        console.log(err);
    }
})


//================================== For Change Password ===================================//
router.put('/changePasword/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id
        // console.log("id", id);

        const { oldPassword, password, confirmpassword } = req.body;
        // console.log(oldPassword, password, confirmpassword);

        const userLogin = await Admin.findOne({ _id: id });
        // console.log("userLogin", userLogin);

        if (userLogin) {
            const validate = await bcrypt.compare(oldPassword, userLogin.password)
            // console.log("validate", validate);
            if (validate) {
                const bcryptPass = await bcrypt.hash(password, 10);
                const bcryptCPass = await bcrypt.hash(confirmpassword, 10);                
                const result = await Admin.findByIdAndUpdate(req.params.id, { password: bcryptPass, confirmpassword: bcryptCPass },
                    {
                        new: true
                    },
                );
                res.json({ msg: "Password Change SuccessFully" })
            }
            else {
                res.status(400).send({ error: "Old Password dosn't match!" });

            }
        
        }
    } catch (err) {
        
    }
})

//================================== For Post Genres ===================================//
router.post('/addGenres', async (req, res) => {
    const genres = req.body
    try {
        const result = Genres(genres).save()
        // console.log("result",result);
        res.send("Genres Add")
    } catch (err) {
        console.log( "Error" + err);
    }
})

//================================== For Get Genres ===================================//
router.get('/getGenres', async (req, res) => {                
try{
    const page = req.query.page;
    const search = req.query.search;
        let limit = 4
        let skip = (page - 1) * limit;

        aggregateQuery = []

        aggregateQuery.push(
            { $sort: { "title": 1 } },
        )

        if (search === "") {
            aggregateQuery.push(

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )                        
        } else if (search !== "") {
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "title": new RegExp("^" + search, 'i') },
                        ]
                    },
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        }

        const matchUser = await Genres.aggregate([{ $sort: { "title": 1 } }]);
        let totalPage = Math.ceil(matchUser.length / limit);
        const genres = await Genres.aggregate([aggregateQuery])
    
        res.send({ genres, totalPage })
    }
    catch (err) {
        res.send("error" + err)
    };    
})

//================================== For Edit Genres ===================================//
// router.get('/editGenres/:id', authenticate, async (req, res) => {
//     try {
//         const userData = await Genres.findById(req.params.id)
//         res.send(userData)
//     } catch (err) {
//         res.send('Error' + err)
//     }
// })

//================================== For Update Genres ===================================//
router.put('/updateGenres', async (req, res) => {
    try {
        const id = req.query.id
        const updateValue = req.body

        const userData = await Genres.findByIdAndUpdate(id, updateValue, {new: true})
        res.send({msg: "Genres Updated Successfully!"})
    } catch (err) {
        res.send('Error' + err)
    }
})


//================================== For Delete Genres ===================================//
router.delete('/deleteGenres', authenticate, async (req, res) => {
    const id = req.query.id
    try {
        const deleteGenres = await Genres.findByIdAndDelete(id)
        // console.log("deleteGenres", deleteGenres);
        res.send({msg: "Delete Genres Successfuly!"})
    } catch (err) {
        console.log(err);
    }
})

//================================== For Get Artist ===================================//
router.get('/getArtist', async (req, res) => {
    
      try {
        const page = req.query.page;
        const search = req.query.search;
        let limit = 4
        let skip = (page - 1) * limit;

        aggregateQuery = []

        aggregateQuery.push(
            { $match: { "role": "artist" } },
        )

        if (search === "") {
            aggregateQuery.push(

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )                        
        } else if (search !== "") {
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "userName": new RegExp("^" + search, 'i') },
                            { "email": new RegExp(search, 'i') },

                        ]
                    },
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        }

        const matchUser = await Admin.aggregate([{ $match: { "role": "artist" } }]);
        let totalPage = Math.ceil(matchUser.length / limit);
        const artist = await Admin.aggregate([aggregateQuery])
        res.send({ artist, totalPage })
    }
    catch (err) {
        res.send("error" + err)
    };    
})

//================================== For CreateNft ===================================//
router.post('/uploadNFT', authenticate, async (req, res) => {
    try {
        const userId = req.query.Id;
        // console.log("userId", userId);

        const { title, description, price } = req.body.values
        
        const audioFile = req.body.AudioFile

        const coverImage = req.body.CoverImage

        const nft = { title, description, price, audioFile, coverImage } 
        // console.log("nft", nft);
        
        const newNFT = await Admin.updateOne({ _id: userId }, { $push: { NFT: nft }})
        // console.log("newNFT", newNFT);
        
        res.send({msg: "NFT create Sucessfully!"})
                
    } catch (err) {
        console.log(err);
    }
})

//================================== For Add Image of NFT ===================================//
router.post('/addNFTImage', authenticate, upload.single('image'), async (req, res) => {
    try {
        const photo = req.file;

        const uploadPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: 'auto' })
        
        res.send(uploadPhoto.secure_url)
    } catch (err) {

        res.status(400).send({error: "CoverImage Not Add"})
    }
})

//============================= Add Audio Nft =============================
router.post('/uploadAudioFile',authenticate, upload.single('audio'), async (req, res) => {

    try {
        const file = req.file;
        // console.log("file", file);

        const type = path.extname(file.originalname);
        // console.log("type", type);

        if (type !== '.mp3' && type !== '.wav' && type !== '.sit') {

            res.status(400).send({ error: 'File Is Not An Audio file!' })
        }
        else {
            const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

            const audioFile = uploadFiles.secure_url;

            res.send(audioFile);

        }
    }
    catch (err) {
        res.status(err)
    }
});
//================================== For CreateNft ===================================//
router.get('/getNFT', async (req, res) => {
    try {

        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $unwind: "$NFT"
            },
            {
                $sort: {
                    "NFT.createAt": -1
                }
            }
        );

        const playList = await Admin.aggregate([aggregateQuery]);
            // console.log(playList,);
        res.send(playList)
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//================================== For Count Artist and Genres ===================================//
router.get('/getArtistAndGenresCount', authenticate, async (req, res) => {
    try {
        const aggregateQuery = [];

        aggregateQuery.push(
            {
                $match: {
                    role: "artist"
                }
            }
        )

        const artists = await Admin.aggregate([aggregateQuery]);
        // console.log("artists", artists);

        const ArtistCount = artists.length;
        // console.log('ArtistCount', ArtistCount);

        const genres = await Genres.find();
        const GenresCount = genres.length;

        res.send({ ArtistCount, GenresCount });
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//================================== For Logout User ===================================//
router.get('/logout', authenticate, async (req, res) => {
    try {

        //Remove token from database
        req.authenticateUser.Token = req.authenticateUser.Token.filter((elem) => {
            return elem.token !== req.token
        })
        // console.log(" req.authenticateUser.Token", req.authenticateUser.Token);

        //clear cookie
        res.clearCookie('jwtLogin');
        await req.authenticateUser.save();
        res.status(200).send("user Logout");
    }
    catch (err) {
        console.log('error');
        res.status(500).send(err);
    }
})

module.exports = router
