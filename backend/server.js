require('dotenv').config()
const app = require("./src/app")

app.listen(8080, () => {

  console.log('listenning on port 8080')
})