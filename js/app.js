$(document).ready(function () {
    
let opciones=[];

    function selectMenu(opcion){

      switch(opcion){
        case 'entrante':   //hago las peticiones una dentro de la otra 
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter`)
          .done(function(data){
            opciones = data.meals;
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta`)
          .done (function(data2){
            opciones = opciones.concat(data2.meals)
        
          let random = Math.floor(Math.random() * opciones.length);


           })
        })
        break;
        case 'segundo':
        
        $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`)
        .done(function(data){
          opciones =data.meals;
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`)
          .done(function(data2){
            opciones = opciones.concat(data2.meals);
            $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
            .done(function(data3){
              opciones = opciones.concat(data3.meals);
              let random = Math.floor(Math.random()* opciones.length);
              console.log(opciones[random]);
            })
          })
        })
        
        break;
        case 'vegano':
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan`)
          .done(function(data){
            opciones = data.meals;   //extraigo solo meals
            let random=Math.floor(Math.random()*opciones.length);
            console.log(opciones[random]);
          })
        break;
        case 'japo':
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese`)
          .done(function(data){
            opciones = data.meals;
            let random =Math.floor(Math.random()*opciones.length);
            console.log(opciones[random]);
          })
        break;
        case 'italian':
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`)
          .done(function(data){
            opciones = data.meals;
            let random =Math.floor(Math.random()*opciones.length);
            console.log(opciones[random]);
          })
          
        break;
        case 'dessert':
          $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`)
          .done(function(data){
            opciones = data.meals;
            let random =Math.floor(Math.random()*opciones.length);
            console.log(opciones[random]);
          })
        
         
        break;

      default:
      }
    }





    $("#boton").click(function(){   //esconde boton y muestra el menu
         $("#boton").hide(); 
        $("#menuOpciones").show();
      });

    $('.menu').click(function(){  //al pinchar sobre clase .menu guarda la id y la pasa a la funcion
      const opcion =this.id;
      selectMenu(opcion);
    })  
      
   

});