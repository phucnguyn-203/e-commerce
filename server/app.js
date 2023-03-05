const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalHandleErrorMiddleware = require("./middleware/globalHandleErrorMiddleware");

//ROUTER
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const userRouter = require("./routes/userRoutes");

const whitelist = [process.env.FRONTEND_ADMIN];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

// app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// BODY PARSER
app.use(express.json({ limit: "50mb" }));

//COOKIE PARSER
app.use(cookieParser());
//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//ROUTER MIDDLEWARE
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/users", userRouter);

app.use(globalHandleErrorMiddleware);

module.exports = app;
