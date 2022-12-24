const app = require('./server.js')

const PORT=process.env.PORT;

app.listen(PORT||8080, () => {
    console.log("MajaNotes listening on port 8080")
});
