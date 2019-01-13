
/* Database Configuration */
const db_host = 'localhost';
const db_user = 'root';
const db_password = '';
const db_name = 'metro';
const db_type = 'mysql';
/* End Database Configuration */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser'); //post body handler
const Sequelize = require('sequelize'); //Database ORM
const Op = Sequelize.Op;

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
  app.use('/app', express.static(path.join(__dirname, 'app')));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
  app.use('/app', express.static(path.join(__dirname, 'app')));
}

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
//get all books
app.get('/', (req, res) => {
  eventPemilihan.findAll({
  }).then(function(Event_data){
    res.render('index', {
      Event_data
    }); 
  })
})
app.get('/Pemilihan', function(req,res) {
  res.render('scan');
})
app.get('/EventID=:EventID/Pemilihan', function(req,res) {
  pasanganCalon.findAll({where: {EventID: req.params.EventID}}).then(function(Calon_data){
    res.render('pemilihan', {
      Calon_data
    }); 
  })
})
app.get('/EventID=:EventID/Chart', function(req,res) {
    res.render('chart'); 
})
app.get('/EventID=:EventID/Track', function(req,res) {
    res.render('track'); 
})
app.get('/EventID=:EventID/Nomor=:NomorPasangan', function(req,res) {
  pasanganCalon.findAll({where: {[Op.and]: [{EventID: req.params.EventID}, {NomorPasangan: req.params.NomorPasangan}]}}).then(function(Calon_data){
    res.render('detail', {
      Calon_data
    }); 
  })
})
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

//Connect to database
const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: db_type,
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
});

//Define models
const eventPemilihan = sequelize.define('EventPemilihan', {

  'ID': {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  'Tipe': Sequelize.STRING,
  'Lokasi': Sequelize.STRING,
  'Tahun': Sequelize.INTEGER,
  'CreatedAt': {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  },

  
}, {
  //prevent sequelize transform table name into plural
  timestamps: false,  
  freezeTableName: true,
})

//Define models
const pasanganCalon = sequelize.define('PasanganCalon', {
  'EventID': {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  'NomorPasangan': {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  'NamaPasangan': Sequelize.STRING,
  'NamaKetua': Sequelize.STRING,
  'NamaWakil': Sequelize.STRING,
  'VisiMisi': Sequelize.TEXT,
  'Foto': {
      type: Sequelize.STRING
  },
  'DetailBerkas': {
      type: Sequelize.STRING
  },
  'createdAt': {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  }  
  
}, {
  //prevent sequelize transform table name into plural
  timestamps: false,  
  freezeTableName: true,
})