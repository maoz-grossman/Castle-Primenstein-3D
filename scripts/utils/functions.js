
//--------------------
//
//     functions
//
//--------------------
function fillArrayWith(size, value){
    var array= []
    for(var i = 0; i!= size; ++i){
        array.push(value);
    }
    //console.log(array);
    return array;
}

function numeralArryGraph(graphArray){
    var list= [];
    count = 0;
    for (var i = 0 ; i!= graphArray.length; ++i ){
        list[i] = [];
        for(var j = 0; j!= graphArray[0].length; ++j){
            if(graphArray[i][j] == 1)
                list[i][j] = -1;
            else{
                var v = new Vertex(count++,i,j);
                list[i][j]= v;
            }
    
        }
    }
    //count = size of the graph
    // list = the actual graph;
    return [list,count];
}

function copyMatrix(matrix){
    cpyMat = [];
    for(var i = 0; i!= matrix.length; ++i){
        cpyMat[i]=[];
        for(var j = 0; j!= matrix[0].length; ++j){
            cpyMat[i][j]= matrix[i][j];
        }
    }
    return cpyMat;
}







