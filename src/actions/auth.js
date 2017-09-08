import axios from 'axios';

export function login(userData){
    return (dispatch) => {
        return axios.post('/api/v1/users/signin', userData)
        .then((response)=>{
                console.log('success');
                console.log(response.data.token);
            },
            (errors)=>{console.log('error logging in', errors);}
        );
    }
}

export default {};