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

/************************************************
 ** Pertence a el prototipo  myduin            **
 ** para brindar informacion sobre el estado de**
 ** coneccion en el objeto Noduino y el        **
 ** servidor de sockets.                       **
 ************************************************

  Example2.handle = function() {
    var that = this;
    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {
      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      Noduino.connect(function(err, board) {
        $('#e2-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e2-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e2-exampleConnection .alert-success').removeClass('hide'); 
          that.board = board;
        }
      });
    });
    
  };

/************************************************
 ** Pertence a el prototipo  app.motor         **
 ** para brindar informacion sobre el estado de**
 ** coneccion en el objeto Noduino y el        **
 ** servidor de sockets.                       **
 ************************************************

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

/******************************************
 ** creacion de funciones para velocidad ** 
 ** e intervalo y creacion de objetos    **
 ******************************************
           /*****/
           /*****/
           /*****/
           /*****/
           /*****/
           /*****/
        ////////////
         //////////
          ////////
           /////
            /// 
/************************************************
 ** Pertence a el app para motores del frame-  **
 ** work su labor es asiganr la velocidad de   **
 ** un motor paso a paso se trabaja con el pin **
 ** 9 de placa.                                **
 ************************************************
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

/******************************************************
 ** Pertence al prototipo myduin y es la funcion     **
 ** encargada de iniciar el blink del inyector       **
 ** despues aumentar numero prubas con pin 13        **
 ******************************************************
 
 Example2.start = function(pin, interval) {
    var that = this;
    if (!that.led) {
      this.board.withLED({pin: 13}, function(err, LED) {
        if (err) { return console.log(err); }
        
        that.led = LED;
        that.led.blink(interval);
        that.led.on('change', function(data) {
          if (data.mode == '000') {
            $('#e2-status').removeClass('label-success');
            $('#e2-status').html('Apagado');
          } else {
            $('#e2-status').addClass('label-success');
            $('#e2-status').html('Encendido');
          }
        });
              });
    } else {
      that.led.blink(interval);
    }
  };
  
  return Example2;
});