import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {
        // You would put user id in place of 'my-limit-key' if authentiaction is implemented
        // This is to only limit the requests of specific users and not all
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success) return res.status(429).json({message :"Too many requests, please try again later."});

        next(); // If the request is within the limit, proceed to the next middleware or route handler

    } catch (error) {
        
        console.log("Rate limit error", error);
        next(error); // Pass the error to the next middleware for handling

    }

}

export default rateLimiter;