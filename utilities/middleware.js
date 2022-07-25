const { campgroundSchema, reviewSchema } = require("../schemas/validateSchema");
const Campground = require('../models/campground');
const Review = require("../models/review");
const ExpressError = require("./ExpressError");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirect = req.originalUrl;
        req.flash("error", "You must be signed in");
        return res.redirect("/login");
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next()
};

module.exports.isCommenter = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if (!review.commenter.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next()
};

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};