/**
 * Checks if there is an item similar to unique on the list
 * @param {*} item 
 * @param {*} unique 
 */
function isTheSame(item, unique){
    var uniqueKeyCount = Object.keys(unique).length;
    Object.keys(unique).forEach(function(key){
        if(item[key] == unique[key]) uniqueKeyCount--;
    })
    return uniqueKeyCount == 0;
}

function removeSelf(list, item){
    var newList = [];
    for(var i = 0; i<list.length; i++){
        if(list[i]._id.toString() != item._id.toString())
            newList.push(list[i]);
    }
    return newList;
}

module.exports = {
    isTheSame,
    removeSelf
}