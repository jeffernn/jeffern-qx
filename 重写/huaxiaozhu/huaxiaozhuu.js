const body = $response.body;

const newBody = body.replace(
    /("data"\s*:\s*\{[\s\S]*?"status"\s*:\s*)\d+/,
    '${1}1'
);

$done({
    body: newBody
});
