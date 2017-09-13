/* 
 * In Alloy, models inherit from the Backbone.Model class. 
 * They contain the interactive data and logic used to control and access it. 
 * Models are specified with JavaScript files, which provide a table schema, 
 * adapter configuration and logic to extend the Backbone.Model class.
 */
exports.definition = {
    config: {
        URL: 'http://localhost:8080/api/task',
        headers: {
            "Authorization": 'Basic ' + 
            Ti.Utils.base64encode('P5yTyU4unTzxmRWNwAxgItOWyhuBudfc:'),
        },
		
        adapter: {
            type: 'restapi',
            collection_name: 'tasks',
            idAttribute: "id"
        },
        // Gets the parent node of our Array
        parentNode: function(data) {
            data = data || [];
            return data.tasks || data;
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

