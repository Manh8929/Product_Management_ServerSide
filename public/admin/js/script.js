//button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      // console.log(url.href);
      window.location.href = url.href;
    });
  });
}

// Form-search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
  let url = new URL(window.location.href);
  // console.log(url);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

//Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
// console.log("buttonPagination", buttonPagination);

if (buttonPagination) {
  buttonPagination.forEach((button) => {
    let url = new URL(window.location.href);

    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}

//checkbox multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = document.querySelector("input[name = 'checkall']");
  const inputsId = document.querySelectorAll("input[name = 'id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = document.querySelectorAll(
        "input[name = 'id']:checked",
      ).length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = document.querySelectorAll(
      "input[name = 'id']:checked",
    );
    const typeChange =  e.target.elements.type.value
    if(typeChange == "delete-all"){
      const isConfirm = confirm("bạn có chắc muốn xóa những sản phẩm này ?")
      if(!isConfirm){
        return;
      }
    }
    if(inputChecked.length >0){
      let ids = []
      const inputIds = formChangeMulti.querySelector("input[name = 'ids']")
      inputChecked.forEach((input)=>{
          const id = input.value;
          ids.push(id)
      })
      inputIds.value = ids.join(", ")
      formChangeMulti.submit()
    }else{
      alert("Vui lòng chọn ít nhất 1 bản ghi")
    }
  });
}
