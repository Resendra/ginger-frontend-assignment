angular.module('gingerApp.filters', ['gingerApp.utils']).
filter('byProperty', function(Utils) {

    return function(items, propertyName, values) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if (Utils.contains(values, item[propertyName])) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});
