let obj = JSON.parse($response.body);

obj = {
  code: 1,
  msg: "",
  data: {
    positionResourceType: 1,
    payload: {
      items: [
        {
          id: 17868,
          courseSetId: 2,
          content: "上岸小喵",
          imageUrl: "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAESwwhp1jMa605yJDAnYbs6qMZtriW0RgAC6yAAAqcouVYz9Qt08YnPAAE7BA.jpeg",
          url: "null",
          redirectType: 1,
          ordinal: 8,
          createdTime: 1746799144383,
          startTime: 1759850171000,
          endTime: 4070880000000,
          type: 0,
          bizType: 4
        }
      ],
      count: 1
    }
  }
};

$done({
  body: JSON.stringify(obj)
});
