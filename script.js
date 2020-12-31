const form = document.getElementById('form');
const username = document.getElementById('用户名');
const email = document.getElementById('邮箱');
const password = document.getElementById('密码');
const password2 = document.getElementById('密码2');
//显示错误信息
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
//显示成功outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//检查邮箱是否合法
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, '邮箱不合法');
  }
}
//检测区域
function checkReqired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)}不能为空！`);
    } else {
      showSuccess(input);
    }
  });
}
//检查输入长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)}的长度不得小于${min}`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)}的长度必须小于${max}`);
  } else {
    showSuccess(input);
  }
}
//检查密码是否匹配
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '密码并不匹配');
  }
}

//获得输入区域名称
function getFieldName(input) {
  return input.id;
  //首单词大写，其余不变
  //return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}
//事件监听
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkReqired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
