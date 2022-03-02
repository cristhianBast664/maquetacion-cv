/* **** Menu ***** */

((d) => {
  const $btnMenu = d.querySelector('.menu-btn'),   /* Aqui se accede al primer elemento que encuentre con la clase .menu-btn*/
    $menu = d.querySelector('.menu');
  $btnMenu.addEventListener('click', (e) => { 
    $btnMenu.firstElementChild.classList.toggle('none');  
    $btnMenu.lastElementChild.classList.toggle('none');

    $menu.classList.toggle('is-active')
  });

  d.addEventListener('click', e => {
    if (!e.target.matches('.menu a')) return false

    $btnMenu.firstElementChild.classList.remove('none');  
    $btnMenu.lastElementChild.classList.add('none');

    $menu.classList.remove('is-active')
  });
})(document);


/* classlist.toggle  --> Lo que hace es que si no encuentra la clase enviada como parametro la agrega a las clases existentes, su las hay. En caso de que la clase enviada como parametro exista en el elemento html que estamos accediendo, entonces lo que hace es eliminarla*/


((d)=> {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", e => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/cristhian@udenar.edu.co", {
      method:"POST",
      body: new FormData(e.target)
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(json=> {
        console.log(json);
        location.hash = "#gracias"
        $form.reset();
      })
      .catch(err=> {
        console.log(err);
        let message = err.statusText || "Ocurrio un error, intenta nuevamente"
        $response.querySelector("h3").innerHTML = `Error ${err.status}:${message}`;
      })
      .finally(()=> {
        $loader.classList.add("none");
        setTimeout(()=> {
          location.hash = "#contacto"
        }, 3000)
      });

  });
})(document);