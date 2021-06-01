var fs = require('fs');


function createMindMap(jsonInput, outFilePath) {
    const mindMapData = mapGenerate(jsonInput);
    fs.writeFileSync(outFilePath, mindMapData, { encoding: 'utf8' });
}

function createGroup(jsonInput) {
    let data = JSON.parse(jsonInput);
    let groups = {};
    data.forEach(function(item) {
        let keys = Object.keys(item);
        keys.splice(keys.indexOf("hostname"), 1);

        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let value = item[key];
            if(value){
                if(!(key in groups)){
                    groups[key] = {};
                    groups[key][value] = [item.hostname];
                }else{
                    if(value in groups[key]){
                        groups[key][value].push(item.hostname);
                    }else{
                        groups[key][value] = [item.hostname];
                    };
                };
            };
        };
    })

    return groups;
}

function generateId(i) {
    var rnd = '';
    while (rnd.length < i) {
        rnd += Math.random().toString(36).substring(2);
    }
    return rnd.substring(0, i);
};

function mapGenerate(jsonInput){
    let groups = createGroup(jsonInput);
    let groups_keys = Object.keys(groups);
    let map = {
        "root": {
            "data": {
                "id": generateId(12),
                "created": Date.now(),
                "text": "sites",
                "expandState": "expand",
            },
            "children": []
        },
        "template": "default",
        "theme": "fresh-blue",
        "version": "1.4.43",
    };

    groups_keys.forEach(function(key) {
        let group = groups[key];
        let group_keys = Object.keys(group);
        let childrenObject = {
            "data":{
                "id": generateId(12),
                "created": Date.now(),
                "text": key,
                "expandState":"expand"
            },
            "children": []
        };
        
        group_keys.forEach(function(group_key) {
            let item = group[group_key];
            let childrenObjectItem = {
                "data":{
                    "id": generateId(12),
                    "created": Date.now(),
                    "text": group_key,
                    "layout": null
                },
                "children": []
            }

            item.forEach(function(child) {
                childrenObjectItem["children"].push({
                    "data":{
                        "id": generateId(12),
                        "created": Date.now(),
                        "text": child,
                        "hyperlink": "",
                        "hyperlinkTitle": "",
                        "expandState": "expand",
                        "layout":null
                    },
                })
            })

            childrenObject["children"].push(childrenObjectItem);
        });

        map["root"]["children"].push(childrenObject);
    });


    return JSON.stringify(map);
}

module.exports = createMindMap;