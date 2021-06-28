const express = require('express');
const router = express.Router();

router.get('/uploaded-images', (req, res, next) => {
  res.json({
    images: [
      {
        id: 204900001,
        message: '',
        picture: '/images/00001.jpg',
        pictureSmall: '',
        pictureMedium: '',
        pictureStored: '',
        timestamp: 1578391381,
      },
      {
        id: 204900002,
        message: '',
        picture: '/images/00002.jpg',
        pictureSmall: '',
        pictureMedium: '',
        pictureStored: '',
        timestamp: 1578391381,
      },
      {
        id: 204900003,
        message: '',
        picture: '/images/00003.jpg',
        pictureSmall: '',
        pictureMedium: '',
        pictureStored: '',
        timestamp: 1578391381,
      },
      {
        id: 204900004,
        message: '',
        picture: '/images/00004.jpg',
        pictureSmall: '',
        pictureMedium: '',
        pictureStored: '',
        timestamp: 1578391381,
      },
    ],
  });
});

module.exports = router;
