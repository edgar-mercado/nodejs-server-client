var express = require( 'express')
var app = express()
var cf_app = require( './app/vcap_application')
var cf_svc = require( './app/vcap_services')
var Request = require("request")

app.set( 'views', __dirname + '/views')
app.set( 'view engine', 'jade')
app.use( express.static( __dirname + '/public'))

app.get( '/', function ( req, res) {
  res.render( 'pages/index', {
    app_environment:    app.settings.env,
    application_name:   cf_app.get_app_name(),
    app_uris:           cf_app.get_app_uris(),
    app_space_name:     cf_app.get_app_space(),
    app_index:          cf_app.get_app_index(),
    app_mem_limits:     cf_app.get_app_mem_limits(),
    app_disk_limits:    cf_app.get_app_disk_limits(),
    service_label:      cf_svc.get_service_label(),
    service_name:       cf_svc.get_service_name(),
    service_plan:       cf_svc.get_service_plan()
  })
})

app.get('/test/:wait', function (req, res, next) {
  var wait = req.params.wait
  console.log('Calling second app')
  Request.get('http://localhost:4000/do/'+wait, function (error, response, body)  {
    if(error) {
        return console.dir(error);
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(body)
  })
 })

app.listen( process.env.PORT || 5000)
