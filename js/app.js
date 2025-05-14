$(document).ready(function () {
  let opciones = [];

  $("#volver").click(function () {
    $("#instrucciones").empty();
    $("#derecha").empty();
    $("#izquierda").empty();
    $("#abajo").empty();
    $("#centro").empty();
    $("#menuOpciones").show();
    $('#volver').hide();
  });

  function obtenerReceta(tipo, nombre, callback) {
    $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?${tipo}=${nombre}`).done(function (data) {
      callback(data.meals); //uso callback para asegurarme los datos
    });
  }

  function selectMenu(opcion) {
    $("#menuOpciones").hide();

    switch (opcion) {
      case "entrante": //hago las peticiones una dentro de la otra
        obtenerReceta("c", "Starter", function (entrante) {
          //encadeno callbacks
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
      let plato = data.meals[0]; //obtiene el detalle que es un array de objetos por eso pongo [0]
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
    $("#centro").html(`<h2>${categoria}</h2><h3>${nombre}</h3>`);
    $("#abajo").html(instrucciones);
    $("#izquierda").html(`<img src=${img}/small>`);

    ingredientes.forEach((url) => {
      $("#derecha").append(`<img src="${url}">`);
      $("#volver").show();
    });
  }

  /* $("#boton").click(function () {
    //esconde boton y muestra el menu
    $("#boton").hide();
    $("#menuOpciones").show();
  }); */

  $(".menu").click(function () {
    //al pinchar sobre clase .menu guarda la id y la pasa a la funcion
    const opcion = this.id;
    selectMenu(opcion);
  });
});
