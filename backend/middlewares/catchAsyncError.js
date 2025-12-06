export const catchAsyncError = (thefxn)=>{
 return (req,res,next)=>{
    Promise.resolve(thefxn(req,res,next)).catch(next);}
 }
// }
// 🔹 What it does

// catchAsyncError is a wrapper for your async route functions in Express.

// It runs your async function (thefxn(req,res,next)).

// If the function works fine, it just goes on (you call next() inside it).

// If the function throws an error (like DB failure, invalid token, etc.), .catch(next) automatically passes the error to Express’s error handler.
// When you write this inside a normal async route:

// router.get("/profile", async (req, res, next) => {
//   const user = await User.findById(req.user.id); // may throw
//   res.json({ user });
// });


// 👉 If User.findById throws an error (like invalid ID, DB down, etc.), that error becomes a rejected promise.

// Without a try...catch, the error is not caught → Express does not know what happened.

// The server may crash or just hang because the rejected promise isn’t handled.

// That’s why in the manual way, you must add a catch part yourself:

// router.get("/profile", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id); 
//     res.json({ user });
//   } catch (err) {
//     next(err); // send the error to Express error handler
//   }
// });


// So:

// We are writing both the main logic and the catch part.

// With catchAsyncError, we only write the main logic → the catch part is added automatically by the wrapper.

// ✅ In short:

// Without catchAsyncError → you must write try...catch(next) in every async route.

// With catchAsyncError → you only write the main logic, and it auto-wraps with .catch(next).

