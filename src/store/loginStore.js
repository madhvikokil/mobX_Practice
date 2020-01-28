import { observable, action, computed} from "mobx";

class LoginStore {
    @observable email = "";
    @observable password = "";

    @action addEmail = (email) => {
        this.email = email;
    }

    @action addPassword = (password) => {
        this.password = password;
    }

    @computed get details(){
        return this.email + " " + this.password
    }
 
}
const store = new LoginStore();
export default store;
