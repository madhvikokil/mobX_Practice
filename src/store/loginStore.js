import { observable, action, computed} from "mobx";

class LoginStore {
    @observable loginData = []

    @action addDetails = (obj) => {
        this.loginData.push(obj);
    }
    @computed get details(){
        return this.email + " " + this.password
    }
 
}
const store = new LoginStore();
export default store;
