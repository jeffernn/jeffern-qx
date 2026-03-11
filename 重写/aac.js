// Quantumult X - 夸克网盘视频接口请求头改写
// 作用：把第一套请求头 改成 第二套请求头，fid 保持不变

let body = $request.body;

try {
    // 解析原始请求 JSON
    let req = JSON.parse(body);

    // 只保留 fid，其他全部替换成第二套请求头
    let newReq = {
        fid: req.fid,           // 保留原 fid
        use_right: "",
        resolutions: "low,normal,high,super,2k,4k",
        supports: "fmp4_av,apollo"
    };

    // 返回新请求体
    $done({ body: JSON.stringify(newReq) });

} catch (e) {
    // 出错不修改
    $done({});
}
