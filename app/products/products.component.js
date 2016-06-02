angular.
    module('products').
    component('products', {
        templateUrl: 'products/products.template.html',
        controller: function productsController ($http) {
            var that = this;
            $http.get('products/products.json')
                .then(function (response) {
                    that.products = response.data.products.product;
                });
        }
    });