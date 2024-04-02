/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
    const freq = new Map()
    let position = 0
    
    for(let i=0; i<wall.length; i++){
        //計算空擋
        position = 0
        for(let j=0; j<wall[i].length - 1; j++){
            position += wall[i][j]
            if(freq.get(position)){
                freq.set(position, freq.get(position)+1)
            }else{
                freq.set(position, 1)
            }
        }    
    }
    const gapArr = Array.from(freq.values())
    console.log(gapArr)
    const max = Math.max(...gapArr)
    if(gapArr.length > 0){
        console.log(wall.length-max)
    }else{
        console.log('no')
        console.log(wall.length)
    }
    
};
leastBricks([[1],[1],[1]])
//leastBricks([[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]])