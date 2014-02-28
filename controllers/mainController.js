var main = module.exports = {
    index: function(req, res){
        res.render('index.jade');
    },
    sendEmail: function(req, res){

        var sendgrid = require('sendgrid')(
              process.env.SENDGRID_USERNAME,
              process.env.SENDGRID_PASSWORD
            );

        sendgrid.send({
            to: 'mlechner2@gmail.com',
            from: req.query.address,
            subject: 'Bar 44',
            text: req.query.message
            }, function(err, json) {

            res.send({err: err, json: json});
            
            if (err) { return console.error(err); }
              console.log(json);
            });
        }
}