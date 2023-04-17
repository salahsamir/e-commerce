import chalk from "chalk";


export class ApiFeatures{
    constructor(mongoosequery,queryData){
        this.mongoosequery=mongoosequery
        this.queryData=queryData
       
    }
  pagination(){
    let page=this.queryData.page *1||1

        if(this.queryData.page <=0)page=1
        let skip=(page-1)*5
        this.mongoosequery.limit(5).skip(skip)
    
        return this


  }
  fillter(){
        let objectFilter={...this.queryData}
        //to delete element from object 
        // delete objectFilter['page']
        let delete_elements=['page','sort','keyword','feilds']
        delete_elements.forEach(element => {
            delete objectFilter[element]
        });
      let filter=JSON.stringify(objectFilter)
      filter=filter.replace(/(gt|lt|gte|lte)/,match=>`$${match}`)
      objectFilter=JSON.parse(filter)
      this.mongoosequery.find(objectFilter)
      return this
  }
  sort(){
     if(this.queryData.sort){
         
            let sort=this.queryData.sort.replace(',',' ')
            this.mongoosequery.sort(sort)
        }
        return this
  }
  search(){
   if(this.queryData.search){
          
           this.mongoosequery.find({name:{$regex:this.queryData.search,$options:'i'}})
          
        }
        return this
  }
 select(){

        if(this.queryData.fields){
            let fields=this.queryData.fields.replace(',',' ')
           this.mongoosequery.select(fields)
        }
        return this
 }
      
}