 
var pv = 'scripts/vendor/';
var pl = 'scripts/libs/';
require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
  var Noduino = null,
      motor = null,
      createMotor = function(board) {
        $('#interval-slide').change(function(e){
          var speed = this.value;
          if (!motor){
            board.withMotor({pin:9}, function(e,Motor){
              motor = Motor;
              motor.setSpeed(speed);
            });
          } else {
            motor.setSpeed(speed);
          }
        });
      };

  $(document).ready(function(e) {
    $('#connect').click(function(e) {
      e.preventDefault();
      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090', logger: {container: '#connection-log'}}, Connector, Logger);
        Noduino.connect(function(err, board) {
          $('#connection-status .alert').addClass('hide'); 
          if (err) {
            $('#connection-status .alert-error').removeClass('hide'); }
          else {
            $('#connection-status .alert-success').removeClass('hide'); createMotor(board); }
        });
      }
    });
  });
});
 /**
 * Creamos la instancia para nuestro conector 
 *

define(function() {
  function MyDuin() {
    this.board = null;
    this.led = null;
  }
  
  MyDuin.handle = function() {
    var that = this;
    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {
      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      Noduino.connect(function(err, board) {
        $('#e1-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e1-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e1-exampleConnection .alert-success').removeClass('hide'); 
          that.board = board;
        }
      });
    });
    
  };
  
  MyDuin.stop = function() {
    this.led.stopBlinking();
  };
  
  MyDuin.start = function(pin, interval) {
    var that = this;
    if (!that.led) {
      this.board.withLED({pin: pin}, function(err, LED) {
        if (err) { return console.log(err); }
        
        that.led = LED;
        that.led.blink(interval);
        that.led.on('change', function(data) {
          if (data.mode == '000') {
            $('#e1-status').removeClass('label-success');
            $('#e1-status').html('OFF');
          } else {
            $('#e1-status').addClass('label-success');
            $('#e1-status').html('ON');
          }
        });
      });
    } else {
      that.led.blink(interval);
    }
  };
  
  return MyDuin;
});