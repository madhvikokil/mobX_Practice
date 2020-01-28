import { observable, action, computed } from 'mobx';

class Operation {
    @observable title = "";
    @observable description ="";
    @observable allData = []

    @action addDetails = (data) => {
        this.allData.push(data);
    }

    @computed get count(){
        return this.allData;
    }
}

const store = new Operation();
export default store;