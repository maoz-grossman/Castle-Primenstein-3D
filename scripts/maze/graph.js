
class Vertex{  
    constructor(name,i,j){
        this.name=name;
        this.i=i;
        this.j=j;
        this.pre=null;
    }
}


class Graph{
    constructor(graph){
        //console.log(graph);
        this.graph = graph;
        this.adjacent = [];
        //fills the array list with neighbors 
        for(var i=0;i!=graph.length;++i){
            for(var j=0; j!=graph[0].length;++j){
                // a list of neighbors of any vertex in the graph
                var list=[];
                //the first cell is the vertex which has these neighbors
                var v = new Vertex(graph[i][j],i,j);
                list[0]=v;
                this.getNeighbors(list,v,i,j,1);
                this.adjacent[this.adjacent.length]=list;
            }
        }
    }

    getNeighbors(list,pre,i,j,skip){
        //using the graph was provide
        // returns a list full of vertex neighbors
            if(i>0)
            {
                var v =new Vertex(this.graph[i-skip][j],i-skip,j)
                v.pre = pre;
                list[list.length]=v;
            }
            if(i< this.graph.length-1)
            {
                var v =new Vertex(this.graph[i+skip][j],i+skip,j)
                v.pre = pre;
                list[list.length]=v;
            }
            if(j>0)
            {
                var v =new Vertex(this.graph[i][j-skip],i,j-skip)
                v.pre = pre;
                list[list.length]=v;
            }
            if(j<this.graph[0].length-1)
            {
                var v =new Vertex(this.graph[i][j+skip],i,j+skip)
                v.pre = pre;
                list[list.length]=v;
            }
    }

    toString(){
        var s = "";
        for(var list of this.adjacent ){
            for(var i=0; i!=list.length;++i)
            {
                s+=""+ list[i].name + "->";
            }
            s+="\n";
        }
        //console.log(s);
        return s;
    }
}

