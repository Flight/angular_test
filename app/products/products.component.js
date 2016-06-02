angular.
    module('products').
    component('products', {
        templateUrl: 'products/products.template.html',
        controller: function productsController ($http) {
            var that = this;

            this.sortType = 'pricing.formattedListPrice';
            this.sortReverse  = false;

            $http.get('products/products.json')
                .then(function (response) {
                    that.products = response.data.products.product;
                });
        }
    });