const mysql = require('mysql')
var axios = require("axios").default;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'searcservices'
})

exports.display = (req, res) => {
  res.render('display')
}
exports.searchpage = (req, res) => {
  res.render('home')
}
exports.aboutus = (req, res) => {
  res.render('aboutus')
}

exports.findImage = (req, res) => {
  require('dotenv/config')

  var options = {
    method: 'GET',
    url: 'https://bing-image-search1.p.rapidapi.com/images/search',
    params: {q: req.body.search, count: '10000'}, //POINT
    headers: {
      'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };

    axios.request(options)
    .then(function (response){
        let newObj = response.data.relatedSearches;

        // Database 
        pool.getConnection((err, connection) => {
          if(err) throw err;
          console.log(`Connected as ID : ${connection.threadId}`)
          
          // Convert object to array of array for sending to MySQL
          let values = newObj.reduce((arrData,obj) => {
            let arrResult = [];
            arrResult.push(obj.text);
            arrResult.push(obj.searchLink)
            arrResult.push(obj.thumbnail.thumbnailUrl)
            arrData.push(arrResult);
            return arrData
          },[])
          console.log('Ini VALUESNYA BROO' + values)

          connection.query('INSERT INTO searchtable (Text, SearchLink, Thumbnail) VALUES ?', [values], (err, rows) => {
             
            connection.release()
            if (err) console.log(err);
            else console.log('Your data has been inserted to our database');
          });
        })// End of MySQL


        res.render('display', {newObj} )
    })
    .catch(function(error) {
      console.error(error);
    });
}