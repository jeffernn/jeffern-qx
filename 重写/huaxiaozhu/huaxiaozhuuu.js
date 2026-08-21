const body = $response.body;

const newBody = body.replace(
    /("data"\s*:\s*\{)(.*?)(,"status"\s*:\s*)\d+/s,
    function(match, dataStart, dataContent, statusKey) {
        return dataStart + dataContent + statusKey + "1";
    }
);

$done({
    body: newBody
});
