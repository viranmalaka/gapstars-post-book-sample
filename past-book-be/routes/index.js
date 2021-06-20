const express = require('express');
const router = express.Router();
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, CREATED } = require('http-status-codes').StatusCodes;

const SelectedImages = require('../models/selected-image');
const { to } = require('../utils/common-utils');

// return selected image object for the given author
router.get('/:authorId/selected-images', async (req, res, next) => {
  const { authorId } = req.params;
  const [findError, selectedImage] = await to(SelectedImages.findOne({ authorId }));

  if (findError) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error: findError });
  }

  res.status(OK).json(selectedImage);
});

// create
router.post('/:authorId/selected-images', async (req, res, next) => {
  const { imageSequence } = req.body;
  const { authorId } = req.params;

  const entry = new SelectedImages({
    authorId,
    imageSequence,
    updatedAt: Date.now(),
  });

  const [saveError, savedEntry] = await to(entry.save());

  if (saveError) {
    return res.status(BAD_REQUEST).json({ error: saveError });
  }
  return res.status(CREATED).json(savedEntry);
});

// add, remove, sequence the image list
router.patch('/:authorId/selected-images', async (req, res, next) => {
  const { updatedImageSequence } = req.body;
  const { authorId } = req.params;

  const [updateError, updatedEntry] = await to(
    SelectedImages.findOneAndUpdate(
      { authorId },
      {
        imageSequence: updatedImageSequence,
        updatedAt: Date.now(),
      },
      { upsert: true },
    ),
  );

  if (updateError) {
    return res.status(BAD_REQUEST).json(updateError);
  }

  return res.status(OK).json(updatedEntry);
});

module.exports = router;
