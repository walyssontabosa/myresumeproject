// GET visitor count from the API

async function get_visitors() {
    // call post api request function
    //await post_visitor();
    try {
        let response = await fetch('https://qyr4quqvc4.execute-api.us-east-1.amazonaws.com/prod/visitorcount', {
            method: 'GET',
        });
        let data = await response.json()
        document.getElementById("visitors").innerHTML = data['count'];
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}


get_visitors();
