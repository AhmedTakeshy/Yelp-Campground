const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn, isCommenter, validateReview} = require("../utilities/middleware");
const reviews = require("../controllers/reviews");



router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete("/:reviewId", isLoggedIn, isCommenter, catchAsync(reviews.deleteReview));

module.exports = router;