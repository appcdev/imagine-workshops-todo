// Gets the tasks form arrow built in backbone function
Alloy.Collections.tasks.fetch();

/**
 *
 * @param {Object} e
 */
function handleRowClick(e) {

    // This gets the row you clicked (index) and saves it to the collection triggers a change event calls backbone sync to cloud for update
    Alloy.Collections.tasks.at(e.index).save({
        completed : !Alloy.Collections.tasks.at(e.index).get("completed")
    });
}

/**
 * Adds a task to our list
 */
function handleAdd() {
    if ($.taskName.value) {
        
        var model = Alloy.createModel("tasks");        
        //could also add this in the XML as <Model src="tasks"/> to create instance
        // then you would accessess it like var model = Alloy.Models.tasks;

		// saves it to the collection triggers a change event calls backbone sync to cloud for create
        model.save({
            "description" : $.taskName.value,
            "completed" : false
        }, {
            success : function() {
                Alloy.Collections.tasks.add(model);
            }
        });

        $.taskName.value = "";

    } else {
        alert("Enter a description!");
    }
}

$.index.open();
