try {

    let obj = JSON.parse($response.body);

    if (obj.data && obj.data.video_list) {

        obj.data.video_list.forEach(v => {

            v.member_right = "normal";
            v.right = "normal";
            v.accessable = true;

        });

    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {

    $done({ body: $response.body });

}
