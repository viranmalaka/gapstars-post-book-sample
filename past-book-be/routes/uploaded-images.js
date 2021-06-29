const express = require('express');
const router = express.Router();

const images = [
  {
    id: 204900001,
    message: '',
    picture: '/images/0001.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900002,
    message: '',
    picture: '/images/0002.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900003,
    message: '',
    picture: '/images/0003.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900004,
    message: '',
    picture: '/images/0004.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900005,
    message: '',
    picture: '/images/0005.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900006,
    message: '',
    picture: '/images/0006.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900007,
    message: '',
    picture: '/images/0007.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900008,
    message: '',
    picture: '/images/0008.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900009,
    message: '',
    picture: '/images/0009.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900010,
    message: '',
    picture: '/images/0010.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
  {
    id: 204900011,
    message: '',
    picture: '/images/0011.jpg',
    pictureSmall: '',
    pictureMedium: '',
    pictureStored: '',
    timestamp: 1578391381,
  },
];

router.get('/', (req, res, next) => {
  res.json({
    images,
  });
});

router.get('/filter', (req, res, next) => {
  let imagesId = [];

  if (req.query.ids) {
    imagesId = req.query.ids.split(',').map((id) => parseInt(id));
  }

  if (imagesId.length === 0) {
    return res.json({ images });
  }
  return res.json({
    images: images.filter((imgData) => imagesId.indexOf(imgData.id) >= 0),
  });
});

module.exports = router;
