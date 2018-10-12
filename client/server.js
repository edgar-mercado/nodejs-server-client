var express = require( 'express')
var app = express()
var cf_app = require( './app/vcap_application')
var cf_svc = require( './app/vcap_services')
var Request = require("request")

var httpProxy = require('http-proxy')
var apiProxy = httpProxy.createProxyServer()

var serverEM = 'https://localhost:4000'
var serverCF = 'https://localhost:4000'

// Different routes, same app to test the correct routing through ELBs
app.all('/em/*', function(req, res) {
    console.log('redirecting to Server1')
    apiProxy.web(req, res, {
      changeOrigin: true,
      target: serverEM
    })
})

app.all('/run/*', function(req, res) {
    console.log('redirecting to Server2')
    apiProxy.web(req, res, {
      changeOrigin: true,
      target: serverCF
    })
})



// app.set( 'views', __dirname + '/views')
// app.set( 'view engine', 'jade')
// app.use( express.static( __dirname + '/public'))
//
// app.get( '/', function ( req, res) {
//   res.render( 'pages/index', {
//     app_environment:    app.settings.env,
//     application_name:   cf_app.get_app_name(),
//     app_uris:           cf_app.get_app_uris(),
//     app_space_name:     cf_app.get_app_space(),
//     app_index:          cf_app.get_app_index(),
//     app_mem_limits:     cf_app.get_app_mem_limits(),
//     app_disk_limits:    cf_app.get_app_disk_limits(),
//     service_label:      cf_svc.get_service_label(),
//     service_name:       cf_svc.get_service_name(),
//     service_plan:       cf_svc.get_service_plan()
//   })
// })
// app.get('/test/:wait?', function (req, res, next) {
//   var result  = ''
//
//   var wait = req.params.wait
//   if (!wait) {
//     wait=0
//   }
//   console.log('Calling second app with a wait a delay of ' + wait + ' seconds')
//
//
//   Request.get(serverEM + wait, function (error, response, body)  {
//     if(error) {
//         return console.dir(error)
//     }
//
//     console.log('######### EM ##########')
//     console.log('StatusCode:' + response.statusCode)
//     console.log(response.body)
//     console.log('###########################################################')
//   })
//
//   Request.get(serverCF + wait, function (error, response, body)  {
//     if(error) {
//         return console.dir(error)
//     }
//       console.log('######### CF #########')
//       console.log('StatusCode:' + response.statusCode)
//       console.log(response.body)
//       console.log('#####################################################################')
//   })
//
//   setTimeout((function() {res.send('done')}), (wait*1000)+200)
//   //res.send('Done')
//  })

app.listen( process.env.PORT || 5000)
