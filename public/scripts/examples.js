define(function() {

    var myd = null;
    var e2 = null;
    var e3 = null;
     
   
    function Events() {

    }
    // Generacion de eventos para plantillas inteligentes
    Events.bind = function() {

      // boton de apagado del arduino
      $('#myd-buttonStop').click(function(e) {
        e.preventDefault();
        myd.stop()
      });
      $('#myd-buttonStart').click(function(e) {
          e.preventDefault();
          $('#myd-secondStep .alert').addClas('hide');

          if ($('#myd-interval').val() * 1 < 50) {
            $('#myd-secondStep .alert-error').removeClass('hide');
            $('#myd-secondStep .alert-error').html('Intervalo de tiempo incorrecto. Minimo 50 ms');
          } else if (myd == null)
            $('#myd-secondStep .alert-error').removeClass('hide');
          $('#myd-secondStep .alert-error').html('Conecte arduino primero');
        } else {
          myd.start($('#myd-pinValue').val(), $('#myd-interval').val());
        }
      });

    $('myd-buttonConnect').click(function(e) {
      e.preventDefault();
      $('#myd-exampleConnection .alert').addClass('hide');
      $('#myd-exampleConnection .alert-info').removeClass('hide');
      $('#myd-exampleConnection .alert-info').html('Intentando conectar');
      require(['myduin'], function(example) {
        myd = example;
        example.handle();

      });
    });
   */
    /**
     * Exampel #1
     
    $('#e1-buttonConnect').click(function(e) {
      e.preventDefault();
      
      $('#e1-exampleConnection .alert').addClass('hide');    
      $('#e1-exampleConnection .alert-info').removeClass('hide');
      $('#e1-exampleConnection .alert-info').html('Trying to connect to your Arduino…');      
      require(['example-1'], function(example) {
        example.handle();
      });      
    });
   */
    $('#e2-buttonStop').click(function(e) {
      e.preventDefault();
      e2.stop();
    });

    $('#e2-buttonStart').click(function(e) {
      e.preventDefault();
      $('#e2-secondStep .alert').addClass('hide');

      if ($('#e2-interval').val() * 1 < 25) {
        $('#e2-secondStep .alert-error').removeClass('hide');
        $('#e2-secondStep .alert-error').html('Interval less than 25ms is not allowed!');
      } else if (e2 == null) {
        $('#e2-secondStep .alert-error').removeClass('hide');
        $('#e2-secondStep .alert-error').html('Connect to your Arduino first!');
      } else {
        e2.start($('#e2-pinValue').val(), $('#e2-interval').val());
      }
    });

    $('#e2-buttonConnect').click(function(e) {
      e.preventDefault();
      $('#e2-exampleConnection .alert').addClass('hide');
      $('#e2-exampleConnection .alert-info').removeClass('hide');
      $('#e2-exampleConnection .alert-info').html('Trying to connect to your Arduino…');
      require(['example-2'], function(example) {
        e2 = example;
        example.handle();
      });
    });
    
    /*    
    $('#e3-buttonConnect').click(function(e) {
      e.preventDefault();
      
      $('#e3-exampleConnection .alert').addClass('hide');    
      $('#e3-exampleConnection .alert-info').removeClass('hide');
      $('#e3-exampleConnection .alert-info').html('Trying to connect to your Arduino…');      
      require(['example-3'], function(example) {
        example.handle();
      });      
    });
 */

  };

  return Events;
});