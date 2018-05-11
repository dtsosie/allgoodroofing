$( function() {

$( "#footer" ).append('<div id="dialog-form" title="Contact Us"><p class="validateTips">Either phone or email is required</p> <form> <fieldset> <label for="name">Name</label> <input type="text" name="name" id="name" value="" class="text ui-widget-content ui-corner-all"> <label for="email">Email</label> <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all"> <label for="phone">Phone</label> <input type="text" name="phone" id="phone" value="" class="text ui-widget-content ui-corner-all"> <label for="message">Message</label> <textarea rows="6" cols="42" type="text" name="message" id="message" value="" class="text ui-widget-content ui-corner-all"></textarea> <input type="submit" tabindex="-1" style="position:absolute; top:-1000px"> </fieldset> </form> </div>');

var dialog, form,
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $( "#name" ),
    email = $( "#email" ),
    phone = $( "#phone" ),
    message = $( "#message" ),
    allFields = $( [] ).add( name ).add( email ).add( phone ).add( message),
    tips = $( ".validateTips" );
    function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }
    function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of " + n + " must be between " +
        min + " and " + max + "." );
      return false;
    } else {
      return true;
    }
  }
    function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }
    function contactAgr() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );
    emailValid = checkLength( email, "email", 3, 256 ) && checkRegexp( email, emailRegex, "eg. user@domain.com" );
    phoneValid = checkLength( phone, "phone", 7, 50 );
    if(!(emailValid || phoneValid)) {
      valid = false;
      updateTips( "Valid Email or Phone required.");
    }
    if ( valid ) {
      if(!name.val()){ name.val('Anonymous'); }
      var data = {
          name: name.val(),
          email: email.val(),
          phone: phone.val(),
          message: message.val()
      };
      $.post( 'agr-mail.php', data,
              function(data){
                  alert(data);
              }
      );
      dialog.dialog( "close" );
    }
    return valid;
  }
	dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
      "Contact": contactAgr,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });
    form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    contactAgr();
  });
    $( "li.email a" ).on( "click", function() {
    event.preventDefault();
    dialog.dialog( "open" );
  });
} );
