const express = require('express');
const app = express();

const port = process.env.PORT || 5670;

app.listen(port, () => console.log(`App is running on ${port}`));
