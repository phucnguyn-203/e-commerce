const sendToken = (res, { name, token, maxAge }) => {
    const cookieOption = {
        httpOnly: true,
        sameSite: "strict",
    };
    if (process.env.NODE_ENV === "production") cookieOption.secure = true;
    res.cookie(name, token, {
        ...cookieOption,
        maxAge,
    });
};

module.exports = sendToken;
