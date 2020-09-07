window.addEventListener("load", function () {
  //Timers
  let activar = () => {
    setTimeout(function () {
      Swal.fire(
        "Tenemos las mejores marcas y modelos!!!",
        "Esperemos te gusten...",
        "success"
      );
    }, 100);
  };

  /*  let password = document.querySelector('.js_password');
  let eye = document.getElementById('eye');

  eye.addEventListener('click',function(){
    //console.log(eye.children[0].className);
    //console.log(password.getAttribute('type'));
    if(password.getAttribute('type')== 'password'){
      password.setAttribute('type','text');
      eye.children[0].classList.remove('fa-eye-slash');
      eye.children[0].classList.add('fa-eye');
    }else{
      password.setAttribute('type','password');
      eye.children[0].classList.remove('fa-eye');
      eye.children[0].classList.add('fa-eye-slash');
    }
  })
*/

  let subtitulo = document.getElementById("miH2Subtitulo");
  //console.log(subtitulo);
  subtitulo.addEventListener("mouseover", function () {
    subtitulo.style.color = "white";
    subtitulo.style.backgroundColor = "tomato";
    activar();
  });
});
