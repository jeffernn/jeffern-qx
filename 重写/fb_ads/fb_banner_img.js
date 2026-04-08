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
          imageUrl: "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAESwyFp1jRT4cb_kgrCzULdkDotW7dNlgACDCEAAqcouVa2K3x6mjOUJTsE.jpeg",
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
