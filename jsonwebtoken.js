const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // Creating a token (what the token will contains, a secret used to encrypt, options)
  const token = jwt.sign({ _id: "idUnique" }, process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });
  console.log(token);

  // Verifying a token (token, secret used to encrypt)
  const data = jwt.verify(token, process.env.JWT_SECRET);
  console.log(data);
};

myFunction();
