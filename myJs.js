var invalidForm = false;

function validate(id) 
{ 
  const name = '#' + id;

  const el = $(name);
  
  const errorEl = $(name + 'Error');

  const value = el.val();

  errorEl.removeClass('errorVisible');
  errorEl.removeClass('errorHidden');

  if (value.length < 5) 
  {
    el.addClass('invalid');
    errorEl.addClass('errorVisible');
  }
  else 
  {
    el.removeClass('invalid');
    errorEl.addClass('errorHidden');
  }

  if (id === 'txtEmail' ) 
  {
    const emailPattern = /^[ÄÖÅäÖåA-Za-z0-9._%+-]+@(?:[ÄÖÅäÖåAØÅæøåA-Za-z0-9-]+\.)+[A-Za-z]{2,6};$/;
    const validEmail = emailPatterntest(value);
  

    if (!validEmail || !value.includes('@')) 
    {
      el.addClass('invalid');
      errorEl.addClass('errorVisible');
    }
    else
    {
      el.removeClass('invalid');
      errorEl.addClass('errorHidden')
    }
  }  


  invalidForm =
    $('#txtName').hasClass('invalid') ||
    $('#txtEmail').hasClass('invalid') ||
    $('#selCity').hasClass('invalid') ||
    $('#msg').hasClass('invalid');

  if (invalidForm) 
  {
    $('#bt').prop('disabled', true);
  }
  else 
  {
    $('#bt').prop('disabled', false);
  }
}

$(document).ready(function () 
{
  $('#myForm').submit(function (event) 
  {
    event.preventDefault();

    function validateForm() 
    {
      let valid = true ;
      ['#txtName', '#txtEmail', '#selCity', '#msg'].forEach(id => 
        {
        const el = $(id);
        if (el.val() === '') 
        {
          el.css('border-color', 'red');
          valid = false;
        }
        else 
        {
          el.css('border-color', '');
        }
      });
      
      $('#errorMsg').toggleClass('visible', !valid);
      
      return valid;

    }
    //isvalid calls 'validateForm' function.
    let isValid = validateForm();
    //if the form is valid function savefile () initiates formulären är giltiga/valida anropas saveFile() 
    //and starts the animation.
    if (isValid) 
    {
      saveFile();
    }

    
    function saveFile() {
      const name = document.getElementById('txtName');
      const email = document.getElementById('txtEmail');
      const city = document.getElementById('selCity');
      const msg = document.getElementById('msg');

      let data =
        '\r Name: ' +
        name.value +
        ' \r\n ' +
        'Email: ' +
        email.value +
        ' \r\n ' +
        'City: ' +
        city.value +
        ' \r\n ' +
        'Message: ' +
        msg.value;

      const textToBLOB = new Blob([data], { type: 'text/plain' });
      const sFileName = 'formData.txt';

      let newLink = document.createElement('a');
      newLink.download = sFileName;

      if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
      } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = 'none';
        document.body.appendChild(newLink);
      }

      newLink.click();
      document.getElementById('myForm').reset();

      //Animationen
      $('#show').hide();
      $('#hide').show();

    }  
  });
});
