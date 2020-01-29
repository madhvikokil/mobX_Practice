import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';

class Operation {
    @observable title = "";
    @observable description ="";
    @observable allData = []

    @action addDetails = (data) => {    
        this.allData.push(data);
    }
    @action changeTitle = (data) => {
        this.title = data;
    }
    @action changeDescription = (data) => {
        this.description = data;
    }
    @action updateAllData =(id, title, description) => {
        for(let i=0;i<this.allData.length;i++) {
            console.log("this.allData[i].id,id===>", this.allData[i].id,id)
            if(this.allData[i].id == id){
                this.allData[i].title = title;
                this.allData[i].description = description;
            }
        }
        console.log("updated : ", toJS(this.allData));
    }

    @action deleteData = (id) => {
        for(let i=0;i<this.allData.length;i++) {
            if(this.allData[i].id === id ){
                this.allData.splice(i,1);
                
            }
        }
        console.log("delete : ",toJS(this.allData))
    }

    @computed get count(){
        return this.allData;
    }
}

const store = new Operation();
export default store;