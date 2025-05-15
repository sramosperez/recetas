$(document).ready(function () {
 

   $(".opcion").click(function () {
    //al pinchar sobre clase .opcion guarda la id y la pasa a la funcion
    const opcion = this.id;
    selectMenu(opcion);
  });

  $(".logo").on("click",limpiar);
  $("#volver").on("click",limpiar);

function limpiar(){
  $("#instrucciones, #derecha, #izquierda, #abajo , #centro").empty();
  $(".principal").show();
  $('#volver').hide();
}


  function obtenerReceta(tipo, nombre, callback) {
    $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?${tipo}=${nombre}`).done(function (data) {
      callback(data.meals); //uso callback porque en encadeno peticiones 
    });
  }

  function selectMenu(opcion) {

    $(".principal").hide();

    switch (opcion) {
      case "entrante": //hago las peticiones una dentro de la otra para asegurarme los datos
        obtenerReceta("c", "Starter", function (entrante) {
          obtenerReceta("c", "Pasta", function (pasta) {
            let opciones = entrante.concat(pasta);
            let random = Math.floor(Math.random() * opciones.length);
            obtenerDetalles(opciones[random]);
          });
        });

        break;

      case "segundo":
        obtenerReceta("c", "Beef", function (carne) {
          obtenerReceta("c", "Chicken", function (pollo) {
            let opciones = carne.concat(pollo);
            obtenerReceta("c", "Seafood", function (marisco) {
              opciones = opciones.concat(marisco);
              let random = Math.floor(Math.random() * opciones.length);
              obtenerDetalles(opciones[random]);
            });
          });
        });

        break;
      case "vegano":
        obtenerReceta("c", "Vegan", function (vegan) {
          let random = Math.floor(Math.random() * vegan.length);
          obtenerDetalles(vegan[random]);
        });

        break;
      case "japo":
        obtenerReceta("a", "Japanese", function (japan) {
          let random = Math.floor(Math.random() * japan.length);
          obtenerDetalles(japan[random]);
        });

        break;

      case "italian":
        obtenerReceta("a", "Italian", function (ita) {
          let random = Math.floor(Math.random() * ita.length);
          obtenerDetalles(ita[random]);
        });

        break;
      case "dessert":
        obtenerReceta("c", "Dessert", function (postre) {
          let random = Math.floor(Math.random() * postre.length);
          obtenerDetalles(postre[random]);
        });

        break;

      default:
    }
  }

  function obtenerDetalles(plato) {
    let id = plato.idMeal;
    $.getJSON(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).done(function (data) {
      let plato = data.meals[0]; //obtiene el detalle que es un array de objetos por eso pongo [0] si no da undefined
      let categoria = plato.strCategory;
      let nombre = plato.strMeal;
      let imagen = plato.strMealThumb;
      let instrucciones = plato.strInstructions;
      let ingredientes = [];
      for (let i = 1; i < 20; i++) {
        let ing = plato[`strIngredient${i}`];
        if (ing && ing.trim() !== "") {
          let nombreIng = ing.trim();
          let urlImgIng = `https://www.themealdb.com/images/ingredients/${nombreIng}-Small.png`;
          ingredientes.push(urlImgIng);
        }
      }
      pintarPlato(categoria, nombre, imagen, ingredientes, instrucciones);
    });
  }

  function pintarPlato(categoria, nombre, img, ingredientes, instrucciones) {
    $("#centro").html(`<h2>${nombre}</h2><h2>${categoria}</h2>`);
    $("#abajo").html(`<h2>Instrucciones:</h2> </br> ${instrucciones}`);
    $("#izquierda").html(`<img src=${img}/medium>`);

    ingredientes.forEach((url) => {
      $("#derecha").append(`<img src="${url}">`);
      $("#volver").show();
    });
  }

 
});
