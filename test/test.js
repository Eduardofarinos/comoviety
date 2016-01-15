var expect = require("chai").expect;
var request = require("request");

console.log("Tests...");

describe("Movies y Users", function() {
    
    var url_movie = "http://localhost:3000";
    var url_search = "http://localhost:3000/movies/search";
    var url_add = "http://localhost:3000/movies/newmovie";
    var url_category = "http://localhost:3000/movies/category/Acción";
    var url_nocategory = "http://localhost:3000/movies/category/Comedia";
    
    describe("Películas", function() {
        
        it("return status 200 OK", function(done) {
            request(url_movie, function(err, response, body) {
                expect(response.statusCode).to.equal(200);   
                done();
            });
        });
        
        it("contiene 'Comenta tu' string", function(done) { // las tildes fallan
            request(url_movie, function(err, response, body) {
                expect(body).to.contain("Comenta tu");
                done();
            });
        });
                
        it("buscar con una una pelicula que no exite", function(done) {
            request.post({url: url_search, form: {title : 'algo'}}, function (error, response, body) {
                expect(body).to.contain("no encontrada,");
                done();
            });
        });

        it("buscar con una una pelicula que exite", function(done) {
            request.post({url: url_search, form: {title : 'facil'}}, function (error, response, body) {
                expect(body).to.contain("Director:");
                done();
            });
        });

        it("añadir una pelicula", function(done) {
            request.post({url: url_add, form: {title : 'prueba3'}}, function (error, response, body) {
                expect(body).to.contain("prueba3");
                done();
            });
        });

        it("no hay pelicula en la categoria accion", function(done) {
            request(url_category, function(err, response, body) {
                expect(body).to.contain("No hay");
                done();
            });
        });
        
        it("hay facil en la categoria comedia", function(done) { 
            request(url_nocategory, function(err, response, body) {
                expect(body).to.contain("facil");
                done();
            });
        });
    });
});