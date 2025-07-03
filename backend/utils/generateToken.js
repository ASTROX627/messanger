import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )

  const cookiesOption = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 15 * 60 * 1000,
    ...cookiesOption
  })

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    ...cookiesOption
  })

  return { accessToken, refreshToken }
}

export default generateTokenAndSetCookie;