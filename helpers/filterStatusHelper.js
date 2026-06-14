module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  let index; // Khai báo biến index

  if (query.status) {
    index = filterStatus.findIndex((item) => item.status === query.status);
  } else {
    index = filterStatus.findIndex((item) => item.status === "");
  }

  // Kiểm tra nếu index hợp lệ
  if (index !== -1) {
    filterStatus[index].class = "active";
  }
  return filterStatus;
};
