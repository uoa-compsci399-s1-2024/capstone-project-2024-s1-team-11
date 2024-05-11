import API from "../../api.js";


const authorization = async (user_id, username, signature) => {
    try {
        const response = await fetch(API + `/authorization`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_id: user_id, username: username, signature: signature})
            });
        return response.status === 200;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default authorization;