console.log("app.js loaded")


var chars = {
      "characters": [
        {
          "name": "Luke Skywalker",
          "url": "https://swapi.co/api/people/1/"
        },
        {
          "name": "Darth Vader",
          "url": "https://swapi.co/api/people/4/"
        },
        {
          "name": "Obi-wan Kenobi",
          "url": "https://swapi.co/api/people/unknown/"
        }, 
        {
          "name": "R2-D2",
          "url": "https://swapi.co/api/people/3/"
        }
      ]
    }

Vue.component('character-list',	{
	props : ['character'],
	template : '<li v-on:click="makeActive"> {{character.name}}</li>',
	methods : {
		makeActive : function () {
			app.activeCharacter = this.$props.character;
		},
	}
})

Vue.component('movie-list', {
	props : ['movie'],
	template : '<li><h2>{{movie.title}}</h2><h3>Released: {{Date.parse(movie.release_date).toString("dddd, MMMM dd yyyy")}}</h3><p>{{movie.opening_crawl}}</p> </li>'
})

var app = new Vue({
	el: "#character-app",
	data : {
		characterList : chars.characters,
		activeCharacter : null,
		movieList : [],
		message : "Click on the character to view their movies"
	},	
	watch : {
		activeCharacter : function () {
			app.movieList = [];
			app.message = "Loading";
			$.get(app.activeCharacter.url).then(function(data){
				var movies = [];
				data.films.forEach(function(movie){
					$.get(movie).then(function(m){
						movies.push(m)
					})
				})
				app.message = ""
				app.movieList = movies;
			}).fail(function(){
				app.message = "This character could not be found";
			})	
		}
	}

})

var ship = new Vue({
	el : '#ship',
	data : {
		visible: true,
		image : '<img src="ship.png" style="width:inherit"></img>',
		styleObject : {
			width : "200px",
			"z-index" : "-10",
			opacity : "0.7",
			position : "fixed",
			top : "80px",
			left : "30px"
		}
	},
	methods: {
		fly : function () {
				var flyShip = setInterval(function(){
					shipLeft = parseInt(ship.styleObject.left.split("px")[0])
					shipTop = parseInt(ship.styleObject.top.split("px")[0])
					if (shipLeft > window.innerWidth || shipTop > window.innerHeight){
						ship.styleObject.left = "30px";
						ship.styleObject.top = "80px";
						clearInterval(flyShip)
					}else {
					ship.styleObject.left = shipLeft + Math.random()*4 + "px"
					ship.styleObject.top = shipTop + Math.random()*3 + "px"
					}
				},2)
				flyShip
		}
	}
})