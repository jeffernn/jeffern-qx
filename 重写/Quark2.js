try {

    let obj = JSON.parse($response.body);

    obj.resolutions = "low,normal,high,super,origin";

    $done({body: JSON.stringify(obj)});

} catch(e) {

    $done({body: $response.body});

}
